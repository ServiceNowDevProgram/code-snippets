(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var user1Email = request.queryParams.user1Email; // taking email of user1 as query parameter
    var user2Email = request.queryParams.user2Email; // taking email of user2 as query parameter

    var user1GR = new GlideRecord('sys_user'); //querying over user record
    user1GR.addQuery('email', user1Email);
	  user1GR.query();
	  user1GR.next();

    var user2GR = new GlideRecord('sys_user');
    user2GR.addQuery('email', user2Email);
	  user2GR.query();
	  user2GR.next();

    var differences = [];

    var fieldsGR = new GlideRecord('sys_dictionary'); //querying over dictionary record
    fieldsGR.addQuery('name', 'sys_user'); //querying over particular user table in dictionary record
    fieldsGR.query();
    while (fieldsGR.next()) {
        var fieldName = fieldsGR.element.getDisplayValue();
        if (user1GR[fieldName] && user2GR[fieldName]) {
            var user1Value = user1GR.getDisplayValue(fieldName);  //fetching the value of field for user1
            var user2Value = user2GR.getDisplayValue(fieldName);  //fetching the value of field for user2
            if (user1Value !== user2Value) { // checking the difference
                differences.push({
                    field: fieldsGR.column_label.getDisplayValue(),
                    user1Value: user1Value,
                    user2Value: user2Value
                }); //stroing different value between two user in differences array
            }
        }
    }
    response.setStatus(200);
    response.setBody(differences);  //setting the differences array in response body
})(request, response);
