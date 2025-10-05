(function executeRule(current, previous /*null when async*/) {

    // Example: Prevent record submission if Impact = Low and Priority = High
    if (current.impact == 3 && current.priority == 1) { // 3 = Low, 1 = High
        gs.addErrorMessage("Invalid combination: 'High' Priority cannot be set with 'Low' Impact.");
        current.setAbortAction(true); // Prevents insert/update
    }

})(current, previous);
