function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }
    
    // Regular expression for email validation
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Test the email against the pattern
    if (!emailPattern.test(newValue)) {
        g_form.showFieldMsg('email_field_name', 'Invalid email format. Example: user@example.com', 'error');
        g_form.hideFieldMsg('email_field_name', true); // Clear info messages
    } else {
        g_form.hideFieldMsg('email_field_name'); // Clear error message
        g_form.showFieldMsg('email_field_name', 'Valid email address', 'info');
    }
}