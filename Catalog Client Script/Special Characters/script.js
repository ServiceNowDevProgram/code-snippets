function onChange(control, oldValue, newValue, isLoading, isTemplate) {

    if (isLoading || newValue === '') {
        return;
    }

    //In the below regex, you can add or remove any special characters as per your requirement
    var special_chars = /[~@|$^<>\*+=;?`')[\]]/;   

    if (special_chars.test(newValue)) {
        g_form.clearValue('<give your field name for which you are validating>');
        g_form.showErrorBox('<give your field name for which you are validating>','Special Characters are not allowed');  //you can change the error message as required.
    }

}
