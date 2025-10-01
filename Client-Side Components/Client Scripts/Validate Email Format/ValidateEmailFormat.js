// Client Script: Validate Email Format on User Record

function onSubmit() {
    var emailField = g_form.getValue('email');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailField)) {
        g_form.addErrorMessage('Please enter a valid email address.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
