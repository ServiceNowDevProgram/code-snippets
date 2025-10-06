
(function () {
    var tableName = 'incident';               // ✅ Set your target table
    var fieldName = 'short_description';      // ✅ Set your target field to check duplicates

    findDuplicates(tableName, fieldName);

    function findDuplicates(tableName, fieldName) {
        // --- Validate Table ---
        if (!gs.tableExists(tableName)) {
            gs.error('❌ Table "' + tableName + '" does not exist.');
            return;
        }

        // --- Validate Field ---
        var gr = new GlideRecord(tableName);
        gr.initialize();
        if (!gr.isValidField(fieldName)) {
            gs.error('❌ Field "' + fieldName + '" does not exist on table "' + tableName + '".');
            return;
        }

        // --- Use GlideAggregate for Efficient Counting ---
        var ga = new GlideAggregate(tableName);
        ga.addAggregate('COUNT', fieldName);
        ga.groupBy(fieldName);
        ga.addHaving('COUNT', '>', 1);   // Find duplicate groups
        ga.addNotNullQuery(fieldName);   // Ignore empty or null values
        ga.query();

        var duplicateGroups = [];
        while (ga.next()) {
            var value = ga.getDisplayValue(fieldName);
            var count = parseInt(ga.getAggregate('COUNT', fieldName), 10);
            duplicateGroups.push({
                value: value,
                count: count
            });
        }

        // --- Logging Results ---
        if (duplicateGroups.length === 0) {
            gs.info('✅ No duplicates found for "' + fieldName + '" on "' + tableName + '".');
            return;
        }

        gs.info('⚠️ Found ' + duplicateGroups.length + ' duplicate groups for "' + fieldName + '" on "' + tableName + '".');

        // --- Detailed Logging (optional for large datasets) ---
        duplicateGroups.forEach(function (item, index) {
            gs.info(
                (index + 1) + '. Value: "' + item.value + '" → Occurrences: ' + item.count
            );
        });

        // --- (Optional) Retrieve Record Sys IDs for deeper analysis ---
        // Uncomment the section below if you need to list Sys IDs for each duplicate group
        /*
        duplicateGroups.forEach(function (dup) {
            gs.info('--- Records with "' + fieldName + '" = "' + dup.value + '" ---');
            var dupRec = new GlideRecord(tableName);
            dupRec.addQuery(fieldName, dup.value);
            dupRec.query();
            while (dupRec.next()) {
                gs.info('   Sys ID: ' + dupRec.getUniqueValue());
            }
        });
        */
    }
})();
