function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var num = g_form.getValue('valid_number');  //phone number field that needs to be validated
    var regex = /^[\d\+ )(/-]+$/;               // allows the following characters +, -, (, ), all numbers in no particular order
    if (!regex.test(num)) {
        alert('Please enter a valid Phone number.');
        g_form.clearValue('valid_number');
    }
}
