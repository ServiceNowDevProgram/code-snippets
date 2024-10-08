// UI Action: Export Incident to CSV
// Table: incident
// Condition: true
// Client: false

(function executeAction(current) {
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Number,Short Description,Priority,State\n"; // Header

    var gr = new GlideRecord('incident');
    gr.query();
    while (gr.next()) {
        var row = [
            gr.number,
            gr.short_description,
            gr.priority.getDisplayValue(),
            gr.state.getDisplayValue()
        ].join(","); // Create CSV row
        csvContent += row + "\n"; // Add row to CSV
    }

    // Create download link
    var encodedUri = encodeURI(csvContent);
    gs.addInfoMessage("Download your CSV file <a href='" + encodedUri + "' target='_blank'>here</a>.");
})(current);
