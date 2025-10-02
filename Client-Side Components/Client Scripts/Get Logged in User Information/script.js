if (g_user.hasRole('admin') || g_user.hasRole('itil')) {
    // User has at least one of the roles
    g_form.setDisplay('internal_notes', true);
}

if (g_user.hasRole('admin') && g_user.hasRole('itil')) {
    // User must have both roles
    g_form.setDisplay('advanced_settings', true);
}

//Using the parameters to set a field value
g_form.setValue('short_description', g_user.firstName);

g_form.setValue('short_description', g_user.lastName);

g_form.setValue('short_description', g_user.name);

g_form.setValue('short_description', g_user.userID);
