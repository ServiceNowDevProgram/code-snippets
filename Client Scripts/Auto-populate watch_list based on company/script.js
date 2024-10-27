function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }
    var callerID = g_form.getReference('caller_id', getUserCompany);
}

function getUserCompany(callerID) {
    switch (callerID.company) {
        case 'company_1_sys_id':
            g_form.setValue('watch_list', 'PEOPLE_TO_ADD');
            //PEOPLE_TO_ADD is a comma separated list of user sys_id
            //and external email addresses
            break;
        case 'company_2_sys_id':
            g_form.setValue('watch_list', 'PEOPLE_TO_ADD');
            break;
        default:
            break;
    }
}
