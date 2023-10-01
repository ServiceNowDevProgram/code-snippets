//OnChange client script
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading) {
        return;
    }

    //Type appropriate comment here, and begin script below
    var reason = g_form.getValue('hold_reason');
    var state_val = g_form.getValue('state');
    //Checking if the substate is with customer and the worknotes is not empty

    if (reason == 1 && state_val == 3) {

        if (newValue != '') {
            g_form.setMandatory('work_notes', false);
        }
        //Checking if the worknotes is empty
        else if (newValue == '') {
            g_form.setMandatory('work_notes', true);
        }
    } 
}
