// Client Script: Validate Length
// Table: sys_user
// Type: onChange
// Field: phone

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

  if (newValue.length>12) {
    g_form.showFieldMsg('phone', 'Phone number should have a maximum of 12 charecters', 'error');
        g_form.setValue('phone', '');
    }
}
