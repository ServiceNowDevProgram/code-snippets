function onLoad() {
    var fields = g_form.getEditableFields();
    
    var skippedFields = [
        'sys_created_on',
        'sys_created_by',
        'sys_updated_on',
        'sys_updated_by',
    ];

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];

        // Skip fields in the designated array
        if (skippedFields.indexOf(field) !== -1) {
            continue;
        }

        g_form.setMandatory(fields[i], false);
        g_form.setReadOnly(fields[i], true);

    }
}
