var cmdb_class_name = "<cmdb_ci_class_name>"; // Replace with your cmdb_table_name
var record_sys_id = "<cmdb_ci_record_sys_id>"; // Replace with your cmdb_ci record sys_id

var request = new sn_ws.RESTMessageV2();
request.setHttpMethod('get');
request.setEndpoint('https://<instance_name>.service-now.com/api/now/cmdb/instance/' + cmdb_class_name + "/" + record_sys_id);
request.setBasicAuth('<instance_username>', '<instance_password>'); // Replace with your instance username and password
var response = request.executeAsync();
response.waitForResponse(60);

if (response.getStatusCode() == 200) {
    var body = JSON.parse(response.getBody());
    gs.info("Inbbound Relationships: " + JSON.stringify(body.result.inbound_relations));
    gs.info("Outbound Relationships: " + JSON.stringify(body.result.outbound_relations));
} else {
    gs.error("Error in API Response with statusCode: "+ response.getStatusCode())
}
