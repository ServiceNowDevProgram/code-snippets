// Client Script to Validate Whitespaces
var reg = /\s/;
var value = g_form.getValue('field_name');
var k = reg.test(value);

if (k == true) {
    alert('Field Name cannot have spaces!'); // Alert if field contains whitespace
    g_form.setValue('field_name', ''); // Empty field for any whitespaces
}
