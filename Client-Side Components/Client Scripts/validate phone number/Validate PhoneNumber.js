function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || !newValue) return;

    var fieldName = control.name;
    var fieldLabel = g_form.getLabelOf ? g_form.getLabelOf(fieldName) : fieldName;

    // --- Phone format: (123) 456-7890 ---
    var phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

    // Clear any existing field messages
    if (g_form.hideFieldMsg) g_form.hideFieldMsg(fieldName, true);

    // Validate the phone number
    if (!phonePattern.test(newValue)) {
        // Reset invalid input
        if (g_form.setValue) {
            g_form.setValue(fieldName, '');
        } else {
            control.value = '';
        }

        // Show a clear inline message below the field
        if (g_form.showFieldMsg) {
            g_form.showFieldMsg(
                fieldName,
                'Phone Number must be in the format (123) 456-7890',
                'error',
                false // false = show below the field
            );
        } else {
            alert(fieldLabel + ' must be in the format (123) 456-7890');
        }
    }
}
