function bulkUpdate('incident', 'active=true^priority=3',) {
    if (!table || !query || typeof data !== 'object') {
        gs.error("Invalid parameters provided to bulkUpdate function.");
        return;
    }

    var gr = new GlideRecord(incident);
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
