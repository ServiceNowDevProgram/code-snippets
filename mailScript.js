//You want to send a notification that includes a table of related incidents for a specific problem record. The table should include the incident number, short description, and state.
//Create a Mail Script to generate the table rows dynamically.

//Navigate to System Notification > Email > Notification Email Scripts and create a new script:

//Name: `incidentTable`
//Script:
// Get the problem's sys_id
var problemSysId = current.sys_id;

// Query for related incidents
var gr = new GlideRecord('incident');
gr.addQuery('problem_id', problemSysId);
gr.query();

// Build the HTML table rows
var tableRows = '';

while (gr.next()) {
    tableRows += '<tr>';
    tableRows += '<td>' + gr.number.getDisplayValue() + '</td>';
    tableRows += '<td>' + gr.short_description.getDisplayValue() + '</td>';
    tableRows += '<td>' + gr.state.getDisplayValue() + '</td>';
    tableRows += '</tr>';
}

// Output the table rows
gs.print(tableRows);