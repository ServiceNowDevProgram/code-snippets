/*
Type: OnChnage
Table: sys_template
Field: Template
*/
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    if (g_form.getValue('table') == 'incident') { // table on which sys_template is being created.
        var fields = ['active', 'comments']; // array of fields to be restricted.
        for (var i = 0; i < fields.length; i++) {
            if (newValue.indexOf(fields[i]) > -1) {
                alert("You Cannot Add " + fields[i]); // alert if user selects the restricted field.
                var qry = newValue.split(fields[i]);
                g_form.setValue('template', qry[0] + 'EQ');  // set the template value to previous values (oldValue does not work in this case).
            }
        }
    }
}
