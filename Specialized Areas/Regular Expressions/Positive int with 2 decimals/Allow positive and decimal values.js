function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    // Regex: allows positive integers or decimals with up to two decimal places
    var regex = /^[0-9]+(\.\d{1,2})?$/;

    // Regex explanation:
    // ^               : Start of string
    // [0-9]+          : One or more digits (whole number part)
    // (\.\d{1,2})?    : Optional decimal part
    //   \.            : Literal decimal point
    //   \d{1,2}       : One or two digits after the decimal
    // $               : End of string
    // This pattern matches positive integers or decimals with up to two decimal places

    // Replace 'amount' with the actual field name this script is attached to
    var fieldName = "amount";

    if (!regex.test(newValue) || newValue <= 0) {
        g_form.clearValue(fieldName);
        g_form.showFieldMsg(fieldName, 'Please enter a value greater than zero. Decimals are allowed (up to two places).', 'error');
    }
}
