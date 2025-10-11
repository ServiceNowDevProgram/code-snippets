(function executeRule(current, previous /*null when async*/ ) {
    // --- Configuration ---
    var VARIABLE_NAME_TO_POPULATE_WITH_SUM = 'total_estimate'; // Variable to store the total
    var MRVS_INTERNAL_NAME = 'item_details'; // Internal name of your multi-row variable set
    var MRVS_VARIABLE_NAME_TO_SUM = 'quoted_price'; // Variable name containing the value to sum

    // --- Don't change below ---
    var total_value = 0;

    // Get the MRVS object
    var mrvs = current.variables[MRVS_INTERNAL_NAME];

    // Get the number of rows
    var rowCount = mrvs.getRowCount();

    // Loop through the parsed array of rows
    for (var i = 0; i < rowCount; i++) {
        var row = mrvs.getRow(i);
		var line_price = parseFloat(row[MRVS_VARIABLE_NAME_TO_SUM]) || 0;
		total_value += line_price;
    }

    current.variables[VARIABLE_NAME_TO_POPULATE_WITH_SUM] = total_value.toFixed(2);

})(current, previous);
