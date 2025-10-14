function onChange(control, oldValue, newValue) {
    if (newValue == 'hardware') {
        g_form.setValue('assignment_group', 'Hardware Support');
    } else if (newValue == 'software') {
        g_form.setValue('assignment_group', 'Software Support');
    } else if (newValue == 'network') {
        g_form.setValue('assignment_group', 'Network Team');
    } else {
        g_form.clearValue('assignment_group');
    }
}
