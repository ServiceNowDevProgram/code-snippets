function onSubmit() {
    // Get the field values
    var email = g_form.getValue('email');       
    var phone = g_form.getValue('phone_number'); 

    // Define validation patterns
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^\d{10}$/;

    // Validate email format
    if (!emailPattern.test(email)) {
        g_form.showFieldMsg('email', 'Please enter a valid email address (e.g., user@example.com).', 'error');
        return false; // Prevent form submission
    }

    // Validate phone number
    if (!phonePattern.test(phone)) {
        g_form.showFieldMsg('phone_number', 'Phone number must be exactly 10 digits and contain only numbers.', 'error');
        return false; // Prevent form submission
    }

    return true; // Allow form submission if all validations pass
}
