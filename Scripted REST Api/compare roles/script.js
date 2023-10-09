(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var role1 = request.queryParams.role1;
    var role2 = request.queryParams.role2; 

    var role1GR = new GlideRecord('sys_user_role');
    role1GR.addQuery('name', role1);
	role1GR.query();
	role1GR.next();

    var role2GR = new GlideRecord('sys_user_role');
    role2GR.addQuery('name', role2);
	role2GR.query();
	role2GR.next();

    var differences = [];

    var fieldsGR = new GlideRecord('sys_dictionary'); //querying over dictionary record
    fieldsGR.addQuery('name', 'sys_user_role'); //querying over particular role table in dictionary record
    fieldsGR.query();
    while (fieldsGR.next()) {
        var fieldName = fieldsGR.element.getDisplayValue();
        if (role1GR[fieldName] && role2GR[fieldName]) {
            var role1Value = role1GR.getDisplayValue(fieldName);  //fetching the value of field for role1
            var role2Value = role2GR.getDisplayValue(fieldName);  //fetching the value of field for role2
            if (role1Value !== role2Value) { // checking the difference
                differences.push({
                    field: fieldsGR.column_label.getDisplayValue(),
                    role1Value: role1Value,
                    role2Value: role2Value
                }); //stroing different value between two role in differences array
            }
        }
    }
    response.setStatus(200);
    response.setBody(differences);  //setting the differences array in response body
})(request, response);
