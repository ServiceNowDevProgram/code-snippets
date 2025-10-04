(function scriptedWebServiceOperation(request, response) {
  
	var v1=checkMandatory();  // This function will check the all mandatory validations.
	if(v1==true){
		var grinc = new GlideRecord('incident');
		grinc.initialize();
		grinc.caller_id=request.Caller_id;
		grinc.short_description=request.Short_Description;
		grinc.cmdb_ci=request.CI;
		grinc.insert();  // It will insert the record, with provided values.
		response.Result='Incident Created';
		response.Sys_Id=grinc.sys_id;  // It will return the sys_id in response body.
		response.Number=grinc.number;  // It will return the incident number in response body.
	}else{
		response.Result=v1;
	}
    function checkMandatory() {
        if (request.Caller_id) {
            if (request.Short_Description) {
                if (request.Description) {
                    if (request.CI) {
                        var grci = new GlideRecord('cmdb_ci');   // These are the mandatory validations while submitting the request from client.
						grci.addQuery('name',request.CI);
						grci.addQuery('opertaional_status','1');
						if(grci.next){
							return true;
						}else{
							return 'CI not found or may be it is not in opperational state';
						}
                    } else {
                        return 'CI can not be blank';
                    }
                } else {
                    return 'Description can not be empty';
                }
            } else {
                return 'Short description can not be blank';
            }
        } else {
            return 'Caller Id can not be blank';
        }
    }

})(request, response);
