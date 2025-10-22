function onSubmit() {
    // Get the email field value
    var email = g_form.getValue('email_field_name'); // Replace 'email_field_name' with your actual field name
    
    // Check if email field has a value
    if (email) {
        // Regular expression for email validation
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        // Test the email against the pattern
        if (!emailPattern.test(email)) {
            g_form.addErrorMessage('Please enter a valid email address');
            g_form.showFieldMsg('email_field_name', 'Invalid email format. Example: user@example.com', 'error');
            return false; // Prevent form submission
        }
    }
    
    return true; // Allow form submission
}