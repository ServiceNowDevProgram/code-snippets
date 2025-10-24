var passwordReset = Class.create();
passwordReset.prototype = {
    initialize: function() {},
    nonProdPasswordReset: function(instanceName, userid, password,authProfileName) {
		var access='';
		var endpoint = "https://"+instanceName+'.service-now.com/api/now/table/sys_user/'+userid+'?sysparm_input_display_value=true';
		var request2='';
        var auth = new GlideRecord('sys_auth_profile_basic');
        auth.addEncodedQuery('name='+authProfileName);
        auth.query();
        if (auth.next()) {
            access = auth.getValue('sys_id');
        }      
        request2 = new sn_ws.RESTMessageV2();
        request2.setEndpoint(endpoint);
        request2.setHttpMethod('PATCH');
        request2.setAuthenticationProfile("basic", access);
        request2.setRequestHeader("Accept", "application/json");
        request2.setRequestHeader('Content-Type', 'application/json');
        var currenttime = new GlideDateTime();
        var pw = password;

        var js = {};
        js.locked_out = 'false';
        js.password_needs_reset = 'true';
        js.user_password = pw.toString();

        request2.setRequestBody(JSON.stringify(js));
        var response2 = request2.execute();
        var httpResponseStatus = response2.getStatusCode();
        return(response2.getBody());
    },
    type: 'passwordReset'
};
