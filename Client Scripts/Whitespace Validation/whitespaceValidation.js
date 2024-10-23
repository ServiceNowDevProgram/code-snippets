// Client Script to Validate Whitespaces
var a = g_form.getValue('field_name'); // Get value from the field
	var b = a.length;
	for (var i=0; i<b; ++i) {
    if (a.charAt(i) === ' ') {
        alert('Field Name cannot have spaces!'); // Alert if field contains whitespace
	      g_form.setValue('field_name',''); // Empty field for any whitespaces
    }
}
