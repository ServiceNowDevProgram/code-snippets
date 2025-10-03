(function() {
    var parentSysId = 'a83820b58f723300e7e16c7827bdeed2'; // Replace with actual parent incident sys_id
    var childIncidents = new GlideRecord('incident');
    childIncidents.addQuery('parent_incident', parentSysId);
    childIncidents.query();
    var allClosed = true;
    while (childIncidents.next()) {
        if (childIncidents.state != 7) { // 7 = Closed
            allClosed = false;
            gs.info("Child incident " + childIncidents.number + " is still open.");
        }
    }
    if (allClosed) {
        var parent = new GlideRecord('incident');
        if (parent.get(parentSysId)) {
            parent.state = 7; // Closed
            parent.close_code = 'Duplicate'; // Adjust to valid closure code in your instance
            parent.close_notes = 'Automatically closed since all child incidents are closed.';
            parent.setWorkflow(false); // Prevent triggering BRs/workflows
            parent.update();

            gs.info("Parent incident [" + parent.number + "] has been closed automatically.");
        } else {
            gs.warn("Parent incident not found for sys_id: " + parentSysId);
        }
    } else {
        gs.info("Parent not closed because one or more child incidents are still open.");
    }
})();
