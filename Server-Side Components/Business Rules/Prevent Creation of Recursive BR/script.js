(function executeRule(current, previous /*null when async*/) {
    // Check if the script contains 'current.update()'
    if (current.script && current.script.toLowerCase().includes('current.update()')) {
        var errMsg = "Error: 'current.update()' should not be used in Business Rules.";
        
        // Abort the insert/update operation
        gs.addErrorMessage(errMsg);
        current.setAbortAction(true);
    }


})(current, previous);
