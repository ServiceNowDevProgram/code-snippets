function onSubmit() {
    // Get the password value from the field
    var password = g_form.getValue('password'); // Change 'password' to your field name
    // Get the first and last name values from the fields
    var firstName = g_form.getValue('first_name'); // Change 'first_name' to your field name
    var lastName = g_form.getValue('last_name'); // Change 'last_name' to your field name
    // Define the regex pattern for a strong password
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    // Check if the password contains the first or last name
    if (password.includes(firstName) || password.includes(lastName)) {
        // Display an error message if validation fails
        g_form.showFieldMsg('password', 'Password cannot contain your first or last name.', 'error');
        return false; // Prevent form submission
    }
  // Validate the password against the pattern
    if (!passwordPattern.test(password)) {
        // Display an error message if validation fails
        g_form.showFieldMsg('password', 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.', 'error');
        return false; // Prevent form submission
    }


    return true; // Allow form submission if all validations pass
}
