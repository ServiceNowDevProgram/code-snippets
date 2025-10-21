(function() {
    // ----- CONFIGURATION -----
    var oldScopeSysId = "SYS_ID_OF_THE_FIRST_SCOPED_APP"; // Replace with old scope to update
    var newScopeSysId = "SYS_ID_OF_THE_NEW_SCOPED_APP"; // Replace with new scope to set

    // ----- QUERY AND UPDATE -----
    var gr = new GlideRecord("sys_metadata");
    gr.addQuery("sys_scope", oldScopeSysId);
    gr.query();

    if (!gr.hasNext()) {
        gs.info("No records found for scope: " + oldScopeSysId);
        return;
    }

    while (gr.next()) {
        try {
            var oldValue = gr.sys_scope.toString();

            // Set new scope
            gr.sys_scope = newScopeSysId;

            // Avoid triggering workflows for system updates
            gr.setWorkflow(false);

            // Update the record
            var updatedSysId = gr.update();

            gs.info("Updated sys_metadata record " + updatedSysId +
                    " from scope " + oldValue + " to " + newScopeSysId);
        } catch (e) {
            gs.error("Error updating record sys_id: " + gr.sys_id + " - " + e.message);
        }
    }

    gs.info("Script completed: All relevant records updated.");
})();
