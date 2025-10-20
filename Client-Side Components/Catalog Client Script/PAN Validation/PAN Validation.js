function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        // Clear any previous message if the field is empty
        g_form.hideFieldMsg('pan_number');
        return;
    }

    var panNumber = newValue.toUpperCase(); // Convert input to uppercase for consistency
    var panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(panNumber)) {
        g_form.showFieldMsg('pan_number', 'Invalid PAN card number.', 'error');
    }
    // No "Valid" message displayed to reduce distraction
}
