function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    //Type appropriate comment here, and begin script below
    if (g_form.getValue('extended_leave_start') <= g_service_catalog.parent.getValue("last_working_date")) { // extended leave start date is earlier or equal to last working date
        g_form.clearValue('extended_leave_start');
        g_form.showFieldMsg('extended_leave_start', "Entended leave start can't be earlier or equal to last working day", 'error');
    }

}
