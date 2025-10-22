/*
 * getVariablesJSON
 * Return all variables from the provided RITM as a JSON object
 * Optional second parameter indicates if MRVS should be included (default true)
 */
function getVariablesJSON(ritm, includeMRVS) {
    includeMRVS = includeMRVS != undefined ? includeMRVS : true; // set to true if not provided

    var ritmVariables = ritm.variables;
    var variablesJSON = {};

    for (variableName in ritmVariables) {
        if (ritmVariables[variableName].isMultiRow() && includeMRVS) {
            variablesJSON[variableName] = JSON.parse(ritmVariables[variableName]);
        } else if (!ritmVariables[variableName].isMultiRow()) {
            variablesJSON[variableName] = ritmVariables[variableName].toString();
        }
    }
    return variablesJSON;
}
