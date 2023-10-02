(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
	var group = request.queryParams.Name;  // Name is the query params to get the detials of group.
	var grGroup= new GlideRecord('sys_user_group');
	var obj = {}; // Defining a json.
	grGroup.addQuery('name',group);  // This will query wheather group are valid or not. 
	grGroup.query;
	if(grGroup.get('name',group)){  // If group found
		obj.manager = grGroup.manager.name; // Pushing manager name into obj.
		obj.email = grGroup.email; // Pushing group email into obj.
	}
	response.setBody(obj);  // It will set the obj to response body.

})(request, response);
