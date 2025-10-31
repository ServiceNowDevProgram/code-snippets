(function executeRule(current, previous /*null when async*/) {

    // Only run for active incidents
    if (!current.caller_id || !current.short_description)
        return;

    // Create a GlideRecord on the incident table
    var gr = new GlideRecord('incident');
    gr.addQuery('caller_id', current.caller_id);  // Same caller
    gr.addQuery('short_description', current.short_description);  // Same issue text
    gr.addQuery('sys_created_on', '>=', gs.hoursAgoStart(24));  // Within last 24 hours
    gr.addQuery('state', '!=', 7);  // Exclude closed incidents
    gr.query();

    if (gr.next()) {
        // Stop insert and show an error
        gs.addErrorMessage("A similar incident has already been raised within the last 24 hours: " + gr.number);
        current.setAbortAction(true);  // Prevent record creation
    }

})(current, previous);
