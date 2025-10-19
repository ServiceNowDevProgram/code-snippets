function onSubmit() {
    var shortDescription = g_form.getValue('short_description');

    // Check for length
    if (shortDescription.length > 100) {
        alert('Short Description must not be more than 100 characters long.');
        return false; // Prevent form submission
    }

    // Check for special characters
    var specialCharsRegex = /[^a-zA-Z0-9\s]/g;
    var specialChars = shortDescription.match(specialCharsRegex);

    if (specialChars) {
        alert('Short Description contains invalid characters: ' + specialChars.join(', '));
        return false; // Prevent form submission
    }

    return true; // Allow submission if both checks pass
}
