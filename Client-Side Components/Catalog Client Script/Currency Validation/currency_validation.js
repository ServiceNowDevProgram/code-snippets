function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    var cost = g_form.getValue('variable_name'); //update variable name used for currency
    cost = cost.trim();
    // first character should be dollar sign
    var firstChar = cost.substring(0, 1);
    if (firstChar != '$') {
        validationAlert(oldValue);
    }

    // characters after the $ sign should be numerics
    var costType = isNaN(cost.substring(1));
    if (costType == true) {
        validationAlert(oldValue);
    }

    // entered value should have a decimal point
    var num = cost.substring(1);
    if (num.indexOf('.') == -1) {
        validationAlert(oldValue);
    }

    // there must be 2 digits only after the decimal
    var decNum = num.substring(num.indexOf('.') + 1, num.length);
    if (decNum.length != 2) {
        validationAlert(oldValue);
    }
}

function validationAlert(oldValue) {
    g_form.setValue("variable_name", oldValue);
    var gm = new GlideModal("glide_warn");
    gm.setTitle("Currency formatting problem");
    gm.setPreference("title", "Please enter cost in $0.00 format");
    gm.render();
    return;
}
