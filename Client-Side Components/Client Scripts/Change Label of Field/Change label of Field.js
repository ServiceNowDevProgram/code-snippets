function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    // Prevent execution when the form is loading...
    if (isLoading || newValue == oldValue) return;

    // Update Description field label based on Priority 
    if (newValue == '1') {
        g_form.setLabelOf('description', 'Describe the critical issue in detail');
    } else {
        g_form.setLabelOf('description', 'Description');
    }
}
