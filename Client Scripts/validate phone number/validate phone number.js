// Client Script: Validate Phone Number
// Table: sys_user
// Type: onChange
// Field: phone

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

    var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // Format: (123) 456-7890
    if (!phoneRegex.test(newValue)) {
        g_form.showFieldMsg('phone', 'Phone number must be in the format (123) 456-7890', 'error');
        g_form.setValue('phone', '');
    }
}
