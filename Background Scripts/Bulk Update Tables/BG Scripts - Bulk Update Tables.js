// Bulk update function to update records in any table
function bulkUpdate(table, query, data) {
    if (!table || !query || typeof data !== 'object') {
        gs.error("Invalid parameters provided to bulkUpdate function.");
        return;
    }

    var gr = new GlideRecord(table);
    gr.addEncodedQuery(query);
    gr.query();

    var count = 0;
    while (gr.next()) {
        for (var field in data) {
            if (data.hasOwnProperty(field)) {
                try {
                    gr.setValue(field, data[field]);
                } catch (e) {
                    gs.warn("Failed to set field '" + field + "' on record " + gr.getUniqueValue() + ": " + e.message);
                }
            }
        }
        gr.update();
        count++;
    }

    gs.info("Bulk update completed. Total records updated: " + count);
}

// Call the function to update incidents:
// Where active = true, priority = 3, and category = network
bulkUpdate('incident', 'active=true^priority=1^category=Hardware', {
    state: 2, // Typically "In Progress"
    comments: 'Updated via bulk update script'
});
