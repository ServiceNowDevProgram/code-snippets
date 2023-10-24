function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    var incNum = g_form.getValue('number');
    var loggedUser = g_user.getFullName();
    if (newValue == 'database') {
        g_form.setMandatory('description', true);
        g_form.setValue('short_description', loggedUser + ' ' + incNum);
    } 
}