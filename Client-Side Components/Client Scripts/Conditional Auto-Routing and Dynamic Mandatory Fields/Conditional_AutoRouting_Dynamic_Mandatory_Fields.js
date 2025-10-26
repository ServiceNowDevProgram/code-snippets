function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue === 'hardware') {
        g_form.setMandatory('asset_tag', true);
        g_form.setDisplay('asset_tag', true);
        g_form.setValue('assignment_group', 'Hardware Support Group');
    } else if (newValue === 'software') {
        g_form.setMandatory('asset_tag', false);
        g_form.setDisplay('asset_tag', false);
        g_form.setValue('assignment_group', 'Software Support Group');
    } else {
        g_form.setMandatory('asset_tag', false);
        g_form.setDisplay('asset_tag', true);
    }
}
