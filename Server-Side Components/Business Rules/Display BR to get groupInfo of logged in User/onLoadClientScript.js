function onLoad() {
    //Type appropriate comment here, and begin script below
    if (g_scratchpad.isMemberOf == true) {
        g_form.setReadOnly('u_choice', true); // to make the 'u_choice' read only
        g_form.setDisplay('u_work_item', false); // to hide the 'u_work_item' field
    }
}
