(function executeRule(current, previous /*null when async*/ ) {
    // Check if the Subject Person of case is empty
    if (gs.nil(current.subject_person))
        return;
    // Subject person field reference to User Table. Check if the HR profile is present for the user.
    var profileGR = new GlideRecord('sn_hr_core_profile');
    if (!profileGR.get(current.subject_person))
        return;

    // Get all fields from the current record (case)
    var elements = current.getElements();

    // Loop through each field on the case and get the name
    for (var i = 0; i < elements.size(); i++) {
        var field = elements.get(i);
        var fieldName = field.getName();

        // Skip system fields and derived fields of hr profile (If any)
        if (fieldName.startsWith('sys_') || fieldName === 'hr_profile')
            continue;

        var newValue = current.getValue(fieldName);
        var oldValue = previous.getValue(fieldName);

        // Only act if value changed
        if (newValue != oldValue) {
            // Check if the same field exists in HR profile and is accessible
            if (profileGR.isValidField(fieldName)) {
                profileGR.setValue(fieldName, newValue);
            }
        }
    }
	profileGR.update();

})(current, previous);
