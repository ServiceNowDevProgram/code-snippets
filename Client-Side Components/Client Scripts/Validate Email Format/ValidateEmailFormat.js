// Client Script: Validate Email Format on User Record

function onSubmit() {
    var emailField = g_form.getValue('email');
    //Comprehensive email regex pattern
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(emailField)) {
        g_form.addErrorMessage('Please enter a valid email address.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
