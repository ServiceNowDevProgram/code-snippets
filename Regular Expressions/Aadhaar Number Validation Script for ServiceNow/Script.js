function onSubmit() {
    var aadhaarCard = g_form.getValue('u_adharcard'); // Replace with your actual field name
    var aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;

    if (!aadhaarRegex.test(aadhaarCard)) {
        g_form.addErrorMessage('Please enter a valid Aadhaar card number in the format: 1234 5678 9012.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
