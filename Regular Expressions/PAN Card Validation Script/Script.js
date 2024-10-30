function onSubmit() {
    // Get the value from the PAN field (replace 'u_pan_number' with your actual field name)
    var panNumber = g_form.getValue('u_pan_number');

    // Regular expression for validating PAN card number
    var panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    // Validate the PAN number
    if (!panRegex.test(panNumber)) {
        alert('Please enter a valid PAN card number.');
        // Prevent the form from being submitted
        return false;
    }
    
    // Allow the form to be submitted
    return true;
}
