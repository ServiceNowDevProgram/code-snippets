/*
Add class name and provide name and short description.

*/

var payload = {
    "items": [
        {
            "className": "cmdb_ci_linux_server",
            "values": {
                "name": "Test_Linux_001",
                "short_description": "My New Description"
            }
        }
    ]
};
var jsonUtil = new JSON();
var input = jsonUtil.encode(payload);
var output = SNC.IdentificationEngineScriptableApi.createOrUpdateCI('ServiceNow', input);
gs.print(output);
