function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    if ((!g_form.isNewRecord()) && (newValue != oldValue)) {
        g_form.setMandatory('comments', true);
        g_form.addErrorMessage('Additional comment required when changing Priority.');
    } else {
        g_form.setMandatory('comments', false);
    }
