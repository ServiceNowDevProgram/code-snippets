// Below script automatically updates the priority of all child incidents whenever the parent incident’s priority is modified.
(function executeRule(current, previous /*null when async*/ ) {

    if (current.priority != previous.priority) {
        var childInc = new GlideRecord('incident');
        childInc.addQuery('parent_incident', current.sys_id);
        childInc.query();

        while (childInc.next()) {
            childInc.impact = current.impact;
            childInc.urgency = current.urgency;
            childInc.work_notes = 'Priority updated automatically from parent incident ' + current.number;
            childInc.update();
        }
    }
})(current, previous);
