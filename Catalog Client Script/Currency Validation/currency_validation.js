function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue == '') {
  return;
  }
  var cost = g_form.getValue('variable_name'); //update variable name used for currency
  cost = cost.trim();
  // first character should be dollar sign
  var firstChar = cost.substring(0,1);
  if (firstChar != '$') {
  alert ("Please enter cost in $0.00 format");
  g_form.setValue("daily_rate", oldValue);
  return;
  }

  // characters after the $ sign should be numerics
  var costType = isNaN(cost.substring(1));
  if (costType == true) {
  alert ("Please enter cost in $0.00 format");
  g_form.setValue("daily_rate", oldValue);
  return;
  }

  // entered value should have a decimal point
  var num = cost.substring(1);
  if (num.indexOf('.') == -1) {
  alert ("Please enter cost in $0.00 format");
  g_form.setValue("daily_rate", oldValue);
  return;
  }

  // there must be 2 digits only after the decimal
  var decNum = num.substring(num.indexOf('.')+1, num.length);
  if (decNum.length != 2) {
  alert ("Please enter cost in $0.00 format");
  g_form.setValue("daily_rate", oldValue);
  return;
  }
}
