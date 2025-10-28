
function onSubmit() {
    var shortDescription = g_form.getValue('short_description');
    if (shortDescription.length > 100) {
        alert('Short Description must be not be more than 100 characters long.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
