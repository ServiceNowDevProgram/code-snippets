function onSubmit() {
    // Get the username value from the field
    var username = g_form.getValue('username'); // Change 'username' to your field name

    // Define the regex pattern for a strong username
    var usernamePattern = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;
    
    // Regex explanation:
    // ^           : Start of string
    // [a-zA-Z]    : First character must be a letter
    // [a-zA-Z0-9] : Remaining characters can be letters or digits
    // {5,}        : At least 5 more characters (total minimum length = 6)
    // $           : End of string


    // Validate the username against the pattern
    if (!usernamePattern.test(username)) {
        // Display an error message if validation fails
        g_form.showFieldMsg('username', 'Username must start with a letter, be at least 6 characters long, and contain only letters and numbers.', 'error');
        return false; // Prevent form submission
    }

    return true; // Allow form submission if validation passes
}
