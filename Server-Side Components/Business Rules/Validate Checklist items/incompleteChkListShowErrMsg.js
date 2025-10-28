//Business Rule: before update on the incident table
//Condition: changing state to 'In Progress'
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
        }
    }
})(current, previous);
