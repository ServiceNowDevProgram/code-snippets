// Situation: Prevent the closure of high-priority incidents without manager's approval.

(function executeRule(current, previous /*, g*/) {
    if (current.priority == 1 && current.state == 7) { // Priority 1 means "Critical"
        if (!gs.hasRole('it_manager')) {
            gs.addErrorMessage('High-priority incidents require manager approval before closure.');
            current.setAbort(true);
        }
    }
})(current, previous);

//Explanation: This business rule is triggered when someone tries to change the state of an incident. It checks if the incident is of "Critical" priority (priority 1) and if the current user does not have the 'it_manager' role. If both conditions are met, it prevents the closure of the incident and displays an error message, requiring manager approval before closure.
