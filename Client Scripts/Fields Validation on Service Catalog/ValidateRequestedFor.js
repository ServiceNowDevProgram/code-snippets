function onSubmit() {
    // Get the value of the Requested For field
    var requestedFor = g_form.getValue('requested_for');

    // Check if the Requested For field is empty
    if (!requestedFor) {
        // Display an alert message
        alert('The Requested For field cannot be empty.');

        // Prevent the form from being submitted
        return false;
    }

    // Allow the form to be submitted
    return true;
}
