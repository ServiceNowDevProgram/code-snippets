function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }
    var callerID = g_form.getReference('caller_id', getUserCompany);
}

function getUserCompany(callerID) {
    switch (callerID.company) {
        case 'COMPANY_1_SYSID':
            g_form.setValue('watch_list', 'PEOPLE_TO_ADD');
            //PEOPLE_TO_ADD can be a comma separated string of user sys_id,
            //and external email addresses
            break;
		case 'COMPANY_2_SYSID': 
            g_form.setValue('watch_list', 'PEOPLE_TO_ADD');
            break;
    }
}