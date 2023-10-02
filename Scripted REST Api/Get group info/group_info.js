(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
	var group = request.queryParams.Name;  // This will store the provided group name.
	var grGroup= new GlideRecord('sys_user_group');
	var obj = {};  // This will create an empty object.
	grGroup.addQuery('name',group);  // This will validate, if group exist or not.
	grGroup.query;
	if(grGroup.get('name',group)){  // If group exist
		obj.manager = grGroup.manager.name;  // This will push the manager name to obj.manager
		obj.email = grGroup.email;  // This will push the email name to obj.email
	}
	response.setBody(obj);  // This will set the obj into response body.

})(request, response);
