// Get list of selected incident sys_ids from the list
var selected = g_list.getChecked(); // returns array of sys_ids

if (!selected || selected.length === 0) {
    gs.addInfoMessage('No incidents selected.');
} else {
    var userId = gs.getUserID(); // Current user's sys_id
    var gr = new GlideRecord('incident');
    
    for (var i = 0; i < selected.length; i++) {
        if (gr.get(selected[i])) {
            gr.assignment_group = ''; // Optional: clear group if needed
            gr.assigned_to = userId; // Assign to current user
            gr.update();
        }
    }
    gs.addInfoMessage(selected.length + ' incident(s) assigned to you.');
}
