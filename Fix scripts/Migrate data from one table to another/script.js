var BACKUP_TABLE_NAME = "sn_data_fix_backup";
var UNPROCESSED_BACKUP_STATE = 0;
var PROCESSED_BACKUP_STATE = 1;

var sourceTable = "";
var targetTable = "";
var alternateMapping = { external_id: "model_number" };
var excludeColumns = ["external_id", "source"];

// migrate(sourceTable, targetTable, alternateMapping, excludeColumns);

function migrate(sourceTable, targetTable, alternateMapping, excludeColumns) {
  gs.info("Upgrade: Migrating '{0}' data.", sourceTable);

  if (updateDictionaryReferences(sourceTable, targetTable)) {
    migrateData(sourceTable, targetTable, alternateMapping, excludeColumns);

    if (validateMigration(sourceTable)) deprecateTable(sourceTable);
    else gs.error("Upgrade: Migration of '{0}' was not successful so not deprecating the table.", sourceTable);
  }

  gs.info("Upgrade: '{0}' migration completed.", sourceTable);
}

function validateMigration(sourceTable) {
  gs.info("Upgrade: Validating migration for '{0}'.", sourceTable);

  try {
    var sourceGr = new GlideRecord(sourceTable);
    sourceGr.query();

    if (sourceGr.getRowCount() != 0) {
      gs.info("Upgrade: Found {0} records in the old '{1}' table.", sourceGr.getRowCount(), sourceTable);
      return false;
    }

    gs.info("Upgrade: Successfully validated migration of '{0}'.", sourceTable);
    return true;
  } catch (ex) {
    gs.error("Upgrade: Exception occurred while validating migration for '{0}'.", sourceTable);
  }
}

function updateDictionaryReferences(sourceTableName, targetTableName) {
  gs.info("Upgrade: Starting Dictionary update where '{0}' is being referenced.", sourceTableName);

  try {
    // Creating GlideRecord object to access records from sys_dictionary
    var dictionaryGr = new GlideRecord("sys_dictionary");

    // Using addEncodedQuery to filter the required records
    dictionaryGr.addEncodedQuery("reference=" + sourceTableName);
    dictionaryGr.query();

    // Looping through each record and updating 'reference' field
    while (dictionaryGr.next()) {
      dictionaryGr.setValue("reference", targetTableName);
      dictionaryGr.update();
    }

    gs.info("Upgrade: Completed Dictionary update where '{0}' is being referenced.", sourceTableName);

    return true;
  } catch (ex) {
    gs.error(
      "Upgrade: Exception occurred during Dictionary update where '{0}' is being referenced: {1}",
      sourceTableName,
      ex
    );

    return false;
  }
}

function deprecateTable(tableName) {
  gs.info("Upgrade: starting deprecating '{0}'.", tableName);

  var deprecationLabel = " (deprecated)";
  var dictGr = new GlideRecord("sys_documentation");
  dictGr.addQuery("name", tableName);
  dictGr.addQuery("element", "");
  dictGr.addEncodedQuery("labelNOT LIKE(deprecated)");
  dictGr.query();

  if (dictGr.next()) {
    dictGr.setValue("label", dictGr.label + deprecationLabel);
    dictGr.setValue("plural", dictGr.plural + deprecationLabel);
    dictGr.setValue("hint", dictGr.hint + deprecationLabel);
    dictGr.update();
    gs.info("Upgrade: Successfully deprecated '{0}'", tableName);
  } else {
    gs.info("Upgrade: No table '{0}' found to deprecate", tableName);
  }
}

function cloneColumn(sourceTableName, targetTableName, columnName) {
  // Get the source column's record
  var sourceColumnGR = new GlideRecord("sys_dictionary");
  sourceColumnGR.addQuery("name", sourceTableName);
  sourceColumnGR.addQuery("element", columnName);
  sourceColumnGR.query();

  if (sourceColumnGR.next()) {
    // Create a new sys_dictionary record
    var colLabel = sourceColumnGR.getValue("column_label");
    var colName = sourceColumnGR.getValue("element");
    var colType = sourceColumnGR.getValue("internal_type");
    var colMaxLength = sourceColumnGR.getValue("max_length");
    var colReference = sourceColumnGR.getValue("reference");
    var colDefaultValue = sourceColumnGR.getValue("default_value");
    var colScopeID = sourceColumnGR.getValue("sys_scope");
    SncTableEditor.createElement(
      targetTableName,
      colLabel,
      colName,
      colType,
      colMaxLength,
      colReference,
      colDefaultValue,
      colScopeID
    );

    var newDictionaryGR = new GlideRecord("sys_dictionary");
    newDictionaryGR.addQuery("element", colName);
    newDictionaryGR.addQuery("name", targetTableName);
    newDictionaryGR.query();

    var excludeFields = [
      "name",
      "column_label",
      "element",
      "internal_type",
      "max_length",
      "reference",
      "default_value",
      "sys_scope",
      "sys_update_name",
    ];

    if (newDictionaryGR.next()) {
      newDictionaryGR.setWorkflow(false);
      // Loop through all attributes of the source column
      var all_fields = sourceColumnGR.getFields();

      for (var i = 0; i < all_fields.size(); i++) {
        var fieldName = all_fields.get(i).getName();

        if (excludeFields.indexOf(fieldName) != -1) {
          continue;
        }

        var fieldValue = sourceColumnGR.getValue(fieldName);
        // Set the attribute value in the new sys_dictionary record
        newDictionaryGR.setValue(fieldName, fieldValue);
      }

      // Insert the new sys_dictionary record
      newDictionaryGR.update();

      gs.info("Upgrade: sys_dictionary record updated with sys_id '{0}'.", newDictionaryGR.getUniqueValue());
    }
  } else {
    gs.error("Upgrade: Source column not found with name '{0}' on table '{1}'.", columnName, sourceTableName);
  }
}

function getListOfColumnNames(table) {
  var columnGR = new GlideRecord(table);
  columnGR.query();

  var fields = columnGR.getFields();
  var columns = [];

  for (var i = 0; i < fields.size(); i++) {
    var fieldName = fields.get(i).getName();
    columns.push(fieldName);
  }

  return columns;
}

// function to save the backup of the table records as json string.
function backupRecord(sourceGr, sourceColumns) {
  try {
    var values = {};

    for (var i = 0; i < sourceColumns.length; i++) {
      values[sourceColumns[i]] = sourceGr.getValue(sourceColumns[i]);
    }

    var backupTableGr = new GlideRecord(BACKUP_TABLE_NAME);
    backupTableGr.initialize();
    backupTableGr.setValue("record_id", sourceGr.getUniqueValue());
    backupTableGr.setValue("table_name", sourceGr.getValue("sys_class_name"));
    backupTableGr.setValue("state", UNPROCESSED_BACKUP_STATE);
    backupTableGr.setValue("values", JSON.stringify(values));
    backupTableGr.insert();
    gs.info(
      "Upgrade: Successfully created backup record of '{0}' table with sys_id '{1}'",
      sourceGr.getValue("sys_class_name"),
      sourceGr.getUniqueValue()
    );

    return backupTableGr;
  } catch (ex) {
    gs.error("Upgrade: Exception occurred while creating backup record: {0}", ex);
  }

  return false;
}

function backupTable(sourceTableName) {
  gs.info("Upgrade: Starting backing up records of '{0}' table", sourceTableName);

  try {
    var sourceColumns = getListOfColumnNames(sourceTableName);
    var backupGr = new GlideRecord(sourceTableName);
    backupGr.query();

    while (backupGr.next()) {
      backupRecord(backupGr, sourceColumns);
    }

    gs.info("Upgrade: Successfully backup records of '{0}' table.", sourceTableName);

    return true;
  } catch (ex) {
    gs.error("Upgrade: Exception occurred while backing up data for '{0}' table", sourceTableName);
    return false;
  }
}

function migrateData(sourceTableName, targetTableName, alternateMapping, skipColumns) {
  try {
    if (!backupTable(sourceTableName)) return;

    var sourceColumns = getListOfColumnNames(sourceTableName);
    var targetColumns = getListOfColumnNames(targetTableName);
    var excludeColumns = skipColumns.concat(["sys_class_name", "sys_update_name"]);

    for (var i = 0; i < sourceColumns.length; i++) {
      if (excludeColumns.indexOf(sourceColumns[i]) != -1) {
        continue;
      }

      if (targetColumns.indexOf(sourceColumns[i]) == -1) {
        var targetColumnMapping = alternateMapping[sourceColumns[i]];
        if (targetColumnMapping != undefined && targetColumns.indexOf(targetColumnMapping) != -1) {
          continue;
        }

        try {
          cloneColumn(sourceTableName, targetTableName, sourceColumns[i]);
        } catch (ex) {
          gs.error(
            "Upgrade: Exception occurred while creating column '{0}' in table '{1}'.",
            sourceColumns[i],
            targetTableName
          );
          return false;
        }
      }
    }

    var backupRecordGr = new GlideRecord(BACKUP_TABLE_NAME);
    backupRecordGr.addQuery("table_name", sourceTableName);
    backupRecordGr.query();

    while (backupRecordGr.next()) {
      var recordId = backupRecordGr.getValue("record_id");
      var modelGr = new GlideRecord(sourceTableName);
      modelGr.get(recordId);

      if (gs.nil(modelGr.next())) {
        continue;
      }

      var colValues = {};

      for (var j = 0; j < sourceColumns.length; j++) {
        colValues[sourceColumns[j]] = modelGr.getValue(sourceColumns[j]);
      }

      // Using GlideRecordClassSwitcher to migrate data from source to the target table
      var switcher = new GlideRecordClassSwitcher(modelGr, sourceTableName, false);
      var isSwitchingSuccessful = switcher.switchClass(
        targetTableName,
        sourceTableName + " to " + targetTableName + " migration. "
      );

      if (gs.nil(isSwitchingSuccessful)) {
        continue;
      }

      modelGr = new GlideRecord(targetTableName);
      modelGr.get(recordId);

      try {
        modelGr.setWorkflow(false);

        for (var k = 0; k < sourceColumns.length; k++) {
          var fieldName = sourceColumns[k];

          // exclude populating column if it is excludeColumns list
          if (excludeColumns.indexOf(fieldName) != -1) {
            continue;
          }

          // checking if alternate mapping exists then skip for now
          if (!gs.nil(alternateMapping[fieldName])) {
            continue;
          }

          var fieldValue = colValues[fieldName];
          modelGr.setValue(fieldName, fieldValue);
        }

        // setting alternateMapping in different loop to get it prioritize over the existing value
        for (alternateMappingKey in alternateMapping) {
          try {
            modelGr.setValue(alternateMapping[alternateMappingKey], colValues[alternateMappingKey]);
          } catch (ex) {
            gs.error(
              "Upgrade: Exception occurrred while setting column '{0}' in table '{1}' for sys_id '{2}': {3}",
              alternateMappingKey,
              targetTableName,
              modelGr.getUniqueValue(),
              ex
            );
          }
        }

        modelGr.update();
        backupRecordGr.setValue("state", PROCESSED_BACKUP_STATE);
        backupRecordGr.update();
      } catch (ex) {
        gs.error(
          "Upgrade: Exception occurred while inserting data in '{0}' with sys_id '{1}': {2}",
          targetTableName,
          modelGr.getUniquevalue(),
          ex
        );
      }
    }
  } catch (ex) {
    gs.error(
      "Upgrade: Exception occurred while migrating data from '{0}' to '{1}': {2}",
      sourceTableName,
      targetTableName,
      ex
    );
  }
}
