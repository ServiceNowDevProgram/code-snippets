var impGR = new GlideRecord(data_source.import_set_table_name);
impGR.addQuery('sys_import_set', import_set.sys_id);
impGR.query();

while (impGR.next()) {
    var classDisplayName = impGR.getValue('u_class');//column name as in staging table
    var supportGroupName = impGR.getValue('u_support_group');//column name as in staging table
    var managedByGroupName = impGR.getValue('u_managed_by_group');//column name as in staging table

    if (!classDisplayName) {
        gs.warn('[Import] Skipping row with empty class.');
        continue;
    }

    var classTable = '';
    var dbObjGR = new GlideRecord('sys_db_object');
    dbObjGR.addQuery('label', classDisplayName);
dbObjGR.addEncodedQuery('nameSTARTSWITHu_cmdb_ci^ORnameSTARTSWITHcmdb_ci');//custom CMDB table names are prepended with u_cmdb_ci
    dbObjGR.query();
    if (dbObjGR.next()) {

        classTable = dbObjGR.getValue('name');
    }

    if (!classTable) {
        gs.warn('[Import] Could not find table for class: ' + classDisplayName);
        continue;
    }

    var supportGroupId = '';
    var managedByGroupId = '';

    var groupGR = new GlideRecord('sys_user_group');
    groupGR.addQuery('name', 'IN', supportGroupName + ',' + managedByGroupName);
    groupGR.query();
    while (groupGR.next()) {
        var name = groupGR.getValue('name');
        if (name === supportGroupName) supportGroupId = groupGR.getUniqueValue();
        if (name === managedByGroupName) managedByGroupId = groupGR.getUniqueValue();
    }

    if (!supportGroupId || !managedByGroupId) {
        gs.warn('[Import] Missing group sys_id for: ' + supportGroupName + ' or ' + managedByGroupName);
        continue;
    }


    var ciGR = new GlideRecord(classTable);
    ciGR.addEncodedQuery('Optional-Filters');
    ciGR.query();
    if (!ciGR.hasNext()) {
        gs.warn('[Import] No CI found in ' + classTable + ' with name: ' + classDisplayName);
    }

    while (ciGR.next()) {
        ciGR.setValue('support_group', supportGroupId);
        ciGR.setValue('managed_by_group', managedByGroupId);
        ciGR.update();
    }
}
