// Script for validating user profile fields on submit
(function executeRule(current, previous /*null when async*/) {
    var phoneNumberPattern = /^[0-9]{10}$/; // Modify as needed
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate phone number
    if (!phoneNumberPattern.test(current.phone)) {
        gs.addErrorMessage("Phone number must be a 10-digit number.");
        current.setAbortAction(true);
    }
    
    // Validate email format
    if (!emailPattern.test(current.email)) {
        gs.addErrorMessage("Invalid email format.");
        current.setAbortAction(true);
    }
})(current, previous);
