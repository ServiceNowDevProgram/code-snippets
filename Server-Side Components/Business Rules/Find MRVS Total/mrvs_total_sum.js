(function executeRule(current, previous /*null when async*/) {

    // --- Configuration ---
    var VARIABLE_NAME_TO_POPULATE_WITH_SUM = 'total_estimate'; // Add the name of your variable where total should be saved
    var MRVS_INTERNAL_NAME = 'item_details'; // Add the internal name of your multi-row variable set
    var MRVS_VARIABLE_NAME_TO_SUM = 'quoted_price'; // Add the variable name that contains the value to be added for each row

    // -- Don't change below --
    var mrvs = current.variables[MRVS_INTERNAL_NAME];

    var total_value = 0;
    
    // The mrvs variable is already a JSON string, so we need to parse it
    var mrvsRows = JSON.parse(mrvs);

    // Loop through the parsed array of rows
    for (var i = 0; i < mrvsRows.length; i++) {
        var row = mrvsRows[i];
        var line_price = parseFloat(row[MRVS_VARIABLE_NAME_TO_SUM]) || 0;
        total_value += line_price;
    }


    current.variables[VARIABLE_NAME_TO_POPULATE_WITH_SUM] = total_value.toFixed(2);


})(current, previous);
