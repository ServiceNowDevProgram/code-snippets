// Function to check for duplicates in a specified field of a given table
function DupCheck(table, field) {
    var arr = [];
    var gr = new GlideAggregate(table);

    // Aggregate count of the specified field and group by it
    gr.addAggregate('COUNT', field);
    gr.groupBy(field);
    gr.addHaving('COUNT', '>', 1);
    gr.query();

    gs.info("Please find the duplicates from the " + table + " for the field " + field + " below:");

    // Loop through each group with duplicate counts
    while (gr.next()) {
        var duplicateValue = gr.getValue(field);
        var kb = new GlideRecord(table);

        // Query for active records matching the duplicate value
        kb.addQuery(field, duplicateValue);
        kb.addQuery('active', 'true');
        kb.query();

        // Collect and log the duplicates
        while (kb.next()) {
            arr.push(kb.sys_id.toString());
            gs.info('--> Number: {0}, and its Sys ID: {1}', [kb.number, kb.sys_id]);
        }
    }

    // Optionally return the array of sys_ids for further processing
    gs.info("array of sys_id's : " + arr);
    return arr;
}

// Call the function to check for duplicates in the incident table
DupCheck("kb_knowledge", "short_description");