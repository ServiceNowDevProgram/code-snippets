function onSubmit() {
    var shortDescription = g_form.getValue('short_description');
    if (shortDescription.length < 10) {
        alert('Short Description must be at least 10 characters long.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
