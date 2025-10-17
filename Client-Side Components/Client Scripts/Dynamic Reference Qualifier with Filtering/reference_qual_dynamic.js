 function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    var controlledField = 'assignment_group'; 
    var controllingField = 'u_service';     
    var serviceSysId = g_form.getValue(controllingField);
    var encodedQuery = 'typeLIKEITIL^u_related_service=' + serviceSysId;
    g_form.setQuery(controlledField, encodedQuery);
    var currentGroupSysId = g_form.getValue(controlledField);
    if (currentGroupSysId && oldValue !== '' && currentGroupSysId !== '') {
        g_form.setValue(controlledField, '');
    }
}
