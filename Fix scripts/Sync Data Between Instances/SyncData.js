//Add below Details
var table = "sys_user";
var query = "active=true";
var targetInstance = "dev1234";
var user, password;

sendData(table, targetInstance, query, user, password);

function sendData(table, targetInstance, query) {
    var pload = {};
    var tableGR = new GlideRecord(table);
    if (query) {
        tableGR.addQuery(query);
    }
    tableGR.query();
    while (tableGR.next()) {
        var dictionaryGR = new GlideRecord('sys_dictionary');
        dictionaryGR.addQuery('name=' + table);
        dictionaryGR.query();
        while (dictionaryGR.next()) {
            var element = dictionaryGR.element.toString();
            pload[dictionaryGR.element] = tableGR.getValue(element);
        }
        var requestBody = JSON.stringify(pload);
        //gs.info(requestBody);
        var request = new sn_ws.RESTMessageV2();
        request.setEndpoint('https://' + targetInstance + '.service-now.com/api/now/table/' + table);
        request.setHttpMethod('POST');
        request.setBasicAuth(user, password);
        request.setRequestHeader("Accept", "application/json");
        request.setRequestBody(requestBody);
        var response = request.execute();
        gs.log(response.getBody());
    }
}
