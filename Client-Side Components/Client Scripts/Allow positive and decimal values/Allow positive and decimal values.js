function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
 
    var regex = /^[0-9]+(\.\d{1,2})?$/; // Allows positive integers or decimals
 
    if (!regex.test(newValue) || newValue <= 0) {
        g_form.setValue('amount', '');
        g_form.showFieldMsg('amount', 'Please enter a amount greater than zero with decimals .Decimals are allowed here.', 'error');
 
    }
}
