(function executeRule(current, previous) {
    // Utility function to validate if a field is null, empty, or contains "null"/"NULL"
    function isInvalid(value) {
        return !value || value.toString().trim().toLowerCase() === "null";
    }

    // Abort action if the user_name field is invalid
    if (isInvalid(current.user_name)) {
        gs.addErrorMessage("User name is invalid");
        current.setAbortAction(true);
    }

    // Abort action if both first_name and last_name are invalid
    if (isInvalid(current.first_name) && isInvalid(current.last_name)) {
        gs.addErrorMessage("Either first name or last name must be provided");
        current.setAbortAction(true);
    }

})(current, previous);