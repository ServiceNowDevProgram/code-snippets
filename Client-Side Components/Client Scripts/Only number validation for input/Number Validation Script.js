function onChange(control, oldValue, newValue, isLoading, g_form) {
    if (isLoading || newValue === '') return;

    var fieldName = control.name;
    var fieldLabel = g_form.getLabel ? g_form.getLabel(fieldName) : fieldName;
    var numericPattern = /^[0-9]+$/;

    // Hide old messages safely
    if (g_form.hideFieldMsg) g_form.hideFieldMsg(fieldName, true);

    // Validation logic
    if (!numericPattern.test(newValue)) {
        // Reset only if API supported
        if (g_form.setValue && typeof g_form.setValue === 'function') {
            g_form.setValue(fieldName, oldValue);
        }

        // Show the message directly below the field
        if (g_form.showFieldMsg) {
            g_form.showFieldMsg(
                fieldName,
                'Please enter numbers only', // your custom message
                'error',
                false // false = display under the field, not at top
            );
        } else {
            alert('Short Description filed accepts numbers only');
        }
    }
}
