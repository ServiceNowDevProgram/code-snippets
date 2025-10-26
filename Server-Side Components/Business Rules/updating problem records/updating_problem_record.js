(function executeRule(current, previous) {
    // Check if the state changed to "In Progress"
    if (current.state.changesTo(2)) { // Assuming 2 is the value for "In Progress"
        var grProblem = new GlideRecord('problem');
        grProblem.addQuery('incident', current.sys_id);
        grProblem.query();
        while (grProblem.next()) {
            grProblem.state = 2; // Assuming 2 is the value for "Work in Progress"
            grProblem.update();
        }
    }
})(current, previous);