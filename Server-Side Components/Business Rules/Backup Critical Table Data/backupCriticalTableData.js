// Script to back up critical table data to external storage
(function executeRule(current, previous /*null when async*/) {
    var recordData = {
        sys_id: current.sys_id.toString(),
        number: current.number.toString(),
        short_description: current.short_description.toString()
    };
    
    // Call external API to store data
    var request = new sn_ws.RESTMessageV2();
    request.setEndpoint('https://your-backup-api.com/backup');
    request.setHttpMethod('POST');
    request.setRequestBody(JSON.stringify(recordData));
    
    var response = request.execute();
    gs.info("Backup response: " + response.getBody());
})(current, previous);

