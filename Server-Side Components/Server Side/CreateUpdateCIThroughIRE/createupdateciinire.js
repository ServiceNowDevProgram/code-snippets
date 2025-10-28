/************************************************************************************************/
Input

items -   List of all CI and its attributes in a JSON array that need to inserted or updated
relations - List of all CI relationship in a JSON array that need to be setup when creating or updating a CI
source - The discovery source of the CI

Output - The CI, its related CIs and their relationships are either created or updated through the Identification & Reconciliation engine
  
/************************************************************************************************/


function createOrUpdateCIThroughIRE(items, relations, source) {
    var payload = {
        "items": items,
        "relations": relations
    };
    var jsonUtil = new JSON();
    var input = jsonUtil.encode(payload);
    var response = JSON.parse(SNC.IdentificationEngineScriptableApi.createOrUpdateCI(source, input));
    for (var ci in response.items) {
        gs.info(response.items[ci].className + " with Id " + response.items[ci].sysId + " was " + response.items[ci].operation);
    }

    for (var rel in response.relations) {
        gs.info("CMDB relationship with Id " + response.relations[rel].sysId + " was " + response.relations[rel].operation);
    }
