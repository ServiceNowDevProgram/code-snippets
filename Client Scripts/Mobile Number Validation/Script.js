function validateMobileNumber(mobile) {
    // Regex pattern for mobile number (adjust as necessary)
    var mobilePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return mobilePattern.test(mobile);
}

function onSubmit() {
    var mobile = g_form.getValue('mobile_number_field'); // Replace with your field name

    if (!validateMobileNumber(mobile)) {
        g_form.addErrorMessage('Please enter a valid mobile number.');
        return false; // Prevent submission
    }
    return true; 
}
