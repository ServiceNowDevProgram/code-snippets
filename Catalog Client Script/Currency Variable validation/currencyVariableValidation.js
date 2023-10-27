function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading || newValue == '') {

        return;

    }

    //Type appropriate comment here, and begin script below

    var cost_field = g_form.getValue('cost_field'); //custom currency variable

    cost_field = cost_field.trim();

    // first character should be dollar sign

    var firstChar = cost_field.substring(0, 1);

    if (firstChar != '$' || firstChar != 'second' || firstChar != 'third') {

        alert("Please enter cost_field in $0.00 format along with the currency symbol");

        g_form.setValue("cost_field", oldValue);

        return;

    }

    // characters after the $ sign should be numerics

    var cost_fieldType = isNaN(cost_field.substring(1));

    if (cost_fieldType == true) {

        alert("Please enter cost_field in $0.00 format along with the currency symbol");

        g_form.setValue("cost_field", oldValue);

        return;

    }

    // entered value should have a decimal point

    var num = cost_field.substring(1);

    if (num.indexOf('.') == -1) {

        alert("Please enter cost_field in $0.00 format along with the currency symbol");

        g_form.setValue("cost_field", oldValue);

        return;

    }

    // there must be 2 digits only after the decimal

    var decNum = num.substring(num.indexOf('.') + 1, num.length);

    if (decNum.length != 2) {

        alert("Please enter cost_field in $0.00 format along with the currency symbol");

        g_form.setValue("cost_field", oldValue);

        return;

    }

}

