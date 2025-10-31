/*Sets the field value to the formatted percentage string (e.g., 45 becomes 45.00%).

Retrieves the current value of the field.
Removes any existing % symbol to avoid duplication.
Validates the input to ensure it's a number.
Converts the value to a float.
Formats it to two decimal places and appends a % symbol. */


function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }

   function formatPercent(value) {
    if (value === null || value === undefined || value === '' || isNaN(value)) {
        return "";
    }
    var num = parseFloat(value);
    if (isNaN(num)) 
	return "";
    return num.toFixed(2) + "%";
}
var des_amount = g_form.getValue("<variable_name>").replace("%","");

g_form.setValue("<variable_name>", formatPercent(des_amount));
   
}
