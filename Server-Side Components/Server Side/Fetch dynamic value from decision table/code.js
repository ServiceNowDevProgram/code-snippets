(function calculatedFieldValue(current) {

    var fieldA = current.u_list_items.toString(); // Get value of field 1

    if (fieldA != '') { // Check if field value is empty

        var individualInformation = fieldA.split(",");
        var resultElements = [];
        for (var i in individualInformation) {
            try {
                var inputs = {};
                inputs['u_decision_field'] = individualInformation[i];

                var dt = new sn_dt.DecisionTableAPI(); // Calling decision table by API call
                var response = dt.getDecision('sysid_of_decision_table', inputs);

                var result_elements = response.result_elements;
                var u_return_value = result_elements.u_decision_result.getValue(); // String
                if (resultElements.indexOf(u_return_value) == -1)
                    resultElements.push(u_return_value);

            } catch (e) {
                gs.log("Couldn't run this script Error: " + e);
                resultElements.push('');
            }

        }
        return resultElements.toString(); // Return end result as string to get stored in field 2

    }
})(current);
