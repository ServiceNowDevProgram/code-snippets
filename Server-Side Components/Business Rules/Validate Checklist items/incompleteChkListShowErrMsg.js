// Business Rule: Before Update on Incident table
// Condition: current.state == 2 (In Progress)

(function executeRule(current, previous /*null when async*/) {
    // Only run if state is changing to 'In Progress'
    if (current.state == 2 && previous.state != 2) {

        // Query checklist items tied to this record that are not complete
        var itemGR = new GlideRecord("checklist_item");
        itemGR.addQuery("document", current.sys_id);      // Matches the current record
        itemGR.addQuery("complete", false);               // Only incomplete items
        itemGR.query();

        // If any incomplete item exists, abort the action
        if (itemGR.hasNext()) {
            gs.addErrorMessage("This record has incomplete checklist items. Please complete them before proceeding.");
            current.setAbortAction(true);
        }
    }
})(current, previous);

