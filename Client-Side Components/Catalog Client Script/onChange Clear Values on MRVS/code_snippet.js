function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    g_form.clearValue('IO:sysid'); //pass in the sys_id of your MRVS/multi row variable set
}
