function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    g_form.clearValue('IO:0dde0d561b803d101ea411f2b24bcbc2'); //pass in the sys_id of your MRVS/multi row variable set
}
