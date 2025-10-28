function onClickCheckDetails() {
    // Friendly helper for field normalization guidance
    g_form.hideAllFieldMsgs();
    g_form.clearMessages();

    // --- Get Field values ---
    var firstName = g_form.getValue('first_name');
    var lastName = g_form.getValue('last_name');
    var title = g_form.getValue('title');
    var userId = g_form.getValue('user_name');
    var email = g_form.getValue('email');
    var businessPhone = g_form.getValue('phone');
    var mobilePhone = g_form.getValue('mobile_phone');

    // --- Regex patterns ---
    var capitalRegex = /^[A-Z][a-zA-Z\s]*$/;           // Names & titles start with a capital
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; 
    var phoneRegex = /^\d+$/;                          

    var suggestions = [];

    if (firstName && !capitalRegex.test(firstName)) {
        g_form.showFieldMsg('first_name', 'Suggestion: Start the name with a capital letter.', 'info');
        suggestions.push('First Name');
    }

    if (lastName && !capitalRegex.test(lastName)) {
        g_form.showFieldMsg('last_name', 'Suggestion: Start the name with a capital letter.', 'info');
        suggestions.push('Last Name');
    }

    if (title && !capitalRegex.test(title)) {
        g_form.showFieldMsg('title', 'Suggestion: Titles usually start with a capital letter.', 'info');
        suggestions.push('Title');
    }

    if (!userId) {
        g_form.showFieldMsg('user_name', 'Suggestion: Do not keep the User ID empty.', 'info');
        suggestions.push('User ID');
    }

    if (email && !emailRegex.test(email)) {
        g_form.showFieldMsg('email', 'Suggestion: Please use a valid email format like name@example.com.', 'info');
        suggestions.push('Email');
    }

    if (businessPhone && !phoneRegex.test(businessPhone)) {
        g_form.showFieldMsg('phone', 'Suggestion: Use digits only avoid letters.', 'info');
        suggestions.push('Business Phone');
    }

    if (mobilePhone && !phoneRegex.test(mobilePhone)) {
        g_form.showFieldMsg('mobile_phone', 'Suggestion: Use digits only avoid letters.', 'info');
        suggestions.push('Mobile Phone');
    }

    /
    if (businessPhone && mobilePhone && businessPhone === mobilePhone) {
        g_form.showFieldMsg('phone', 'Work and mobile numbers appear identical, use different Numbers!', 'info');
        suggestions.push('Phone Numbers');
    }

    if (suggestions.length > 0) {
        g_form.addInfoMessage('Quick review complete! Please check: ' + suggestions.join(', ') + '.');
    } else {
        g_form.addInfoMessage('looks good! Nicely formatted data.');
    }
}
