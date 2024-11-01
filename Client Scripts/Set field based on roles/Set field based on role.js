function onLoad() {
    // Check if the user has the 'admin' role
    if (g_user.hasRole('admin')) {
        g_form.setValue('u_assigned', false);  // Set u_assigned (replace with applicable field name) to false if the user has the 'admin' role 
    } 

    // Otherwise, check for the 'case_technician' (replace with applicable roles) roles 
    else if (g_user.hasRole('case_technician')) {
        g_form.setValue('u_assigned', true);  // Set the u_assigned (replace with applicable field name) field to true

    } else {
        g_form.setValue('u_assigned', false);  // Set u_assigned (replace with applicable field name) to false if they don't have the roles
    }
}