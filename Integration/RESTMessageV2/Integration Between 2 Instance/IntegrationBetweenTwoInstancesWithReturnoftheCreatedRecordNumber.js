//The Below code is to integrate two instances, where I integrated two ServiceNow PDIs using outbound REST Message and used HTTP POST method.
//whenever I create any incident in the source incident it will create the same incident in the Target incident using the REST message.
//once the incident is created in the target instance that incident record's number and sys_id will be populated in the Correlation Display and Correlation ID field's of the source instance incident respectively.

//I automated the process using a business rule(after, insert(checked))
//below is the code that I used to automate the process for integrating 2 instances through business rule

(function executeRule(current, previous /*null when async*/ ) {

    try {
        var r = new sn_ws.RESTMessageV2('Gupta Integration for two PDIs', 'Incident Creation By GUPTA');
        //here "Gupta Integration for two PDIs" is the name of the REST Message record and "Incident Creation By GUPTA" is the HTTP POST record name respectively
        r.setStringParameterNoEscape('caller_id', current.caller_id);
        r.setStringParameterNoEscape('short_desc', current.short_description);
        r.setStringParameterNoEscape('desc', current.description);
        r.setStringParameterNoEscape('state', current.state);
        r.setStringParameterNoEscape('ugency', current.urgency);
        r.setStringParameterNoEscape('impact', current.impact);
        r.setStringParameterNoEscape('configurationItem', current.cmdb_ci);
        var response = r.execute();
        var responseBody = response.getBody();
        var responseBodyObj = JSON.parse(responseBody);//using JSON.parse
        var targetSysId = responseBodyObj.result.sys_id;//getting the target record sys_id and storing in the varaible
        var targetIncidentNumber = responseBodyObj.result.number;// getting the target incident record number and storing in the variable
        //assigning those stored values to current record's correlation ID& Display field's respectively
        current.correlation_id = targetSysId;
        current.correlation_display = targetIncidentNumber;
        current.update();

        var httpStatus = response.getStatusCode();
        //logging an info message so that we can check the logs for clarity
        gs.info("Incident is created in target using REST" + JSON.stringify(responseBody));

    } catch (ex) {
        var message = ex.message;
    }

})(current, previous);
