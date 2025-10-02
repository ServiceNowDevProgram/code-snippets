//Business Rule: before update on the escalation table (custom)
(function executeRule(current, previous /*null when async*/) {
    var checklistGR = new GlideRecord("checklist");
    checklistGR.addQuery("document", current.sys_id);
    checklistGR.query();

    while (checklistGR.next()) {
        var itemGR = new GlideRecord("checklist_item");
        itemGR.addQuery("checklist", checklistGR.sys_id);
        itemGR.addQuery("complete", false);
        itemGR.query();

        if (itemGR.hasNext()) {
            gs.addErrorMessage('Checklist has incomplete items. Please complete all before assigning it back.');
            current.setAbortAction(true);
            break; // stop after first failure
        }
    }
})(current, previous);
