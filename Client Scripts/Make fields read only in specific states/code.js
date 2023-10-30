function onLoad() {
    var getStateValue = g_form.getValue('state');
    if (getStateValue == '3') {
        var fields = g_form.getEditableFields();
        for (var fieldLength = 0; fieldLength < fields.length; fieldLength++) {
            g_form.setReadOnly(fields[fieldLength], true);
        }
    }
}