(function executeRule(current, gSNC, gUser, gSNCSession) {
    if (current.caller.vips && current.caller.vips == true) {
        var request = new sn_ws.RESTMessageV2();
        request.setEndpoint('https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX');
        request.setHttpMethod('POST');
        
        var payload = {
            "text": " *VIP Incident Created!* \nCaller: " + current.caller.name + "\nNumber: " + current.number + "\nDescription: " + current.short_description
        };

        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestBody(JSON.stringify(payload));
        var response = request.execute();
    }
})(current, gSNC, gUser, gSNCSession);
