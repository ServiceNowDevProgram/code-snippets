(function executeUIAction(current, previous /*optional*/) {
    // Assign the incident to the current user
    current.assigned_to = gs.getUserID();
    current.update();
})(current, previous);
