function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || !newValue) return;

    var fieldName = control.name;

    // Check for any whitespace
    if (newValue.includes(' ')) {
        // Show inline error message below the field
        if (g_form.showFieldMsg) {
            g_form.showFieldMsg(
                fieldName,
                'This field cannot contain spaces.',
                'error',
                false // false = show below the field
            );
        }

        // Clear the field
        g_form.setValue(fieldName, '');
    } else {
        // Remove any previous message if input is valid
        if (g_form.hideFieldMsg) g_form.hideFieldMsg(fieldName, true);
    }
}
