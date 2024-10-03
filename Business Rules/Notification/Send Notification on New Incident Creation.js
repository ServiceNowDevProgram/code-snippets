// Business Rule: Send Notification on New Incident Creation
// When: After Insert and Table: Incident
(function executeRule(current, previous /*null when async*/) {
    // Only send notification for newly created incidents
    if (current.isNewRecord()) {
        var gr = new GlideRecord('sys_user');
        gr.get(current.assigned_to);
        // Prepare the notification message
        var message = 'A new incident has been assigned to you: ' + current.number;
        // Send the notification
        gs.eventQueue('incident.new', current, gr.sys_id, message);
    }
})(current, previous);
