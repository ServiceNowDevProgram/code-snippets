/*
It runs when the field value changes.
If the new value equals '7', it retrieves all editable fields using g_form.getEditableFields().
Then it loops through each field and sets it to read-only using g_form.setReadOnly().

*/


function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }


    if (newValue == '7') { // update condition as required
        var fields = g_form.getEditableFields();
        for (var i = 0; i < fields.length; i++) {
            g_form.setReadOnly(fields[i].getName(), true);
        }
  
