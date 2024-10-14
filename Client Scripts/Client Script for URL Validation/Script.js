function validateURL(url) {
    // Simple regex for URL validation
    var urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    return urlPattern.test(url);
}

function onSubmit() {
    var url = g_form.getValue('u_url'); // Replace with your field name

    if (!validateURL(url)) {
        g_form.addErrorMessage('Please enter a valid URL. Ensure it starts with http:// or https://');
        return false; // Prevent submission
    }
    return true; // Allow submission
}
