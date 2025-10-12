// Create catalog requests programmatically using CartJS API
// Tested in background script on dev instance - successfully created REQ records
// Works for automation workflows and bulk operations

function createCatalogRequest(catalogItemSysId, requestedFor, requestData) {
    var cart = new sn_sc.CartJS();
    
    var item = {
        "sysparm_id": catalogItemSysId,
        "sysparm_quantity": "1",
        "variables": requestData
    };
    
    cart.addToCart(item);
    var result = cart.checkoutCart();
    
    return {
        request_id: result.request_id,
        request_number: result.request_number
    };
}

// Basic usage example
var catalogItem = 'YOUR_CATALOG_ITEM_SYS_ID';
var user = gs.getUserID();
var data = {
    "short_description": "Automated request"
};

var req = createCatalogRequest(catalogItem, user, data);
gs.info('Created: ' + req.request_number);

// Example with CI reference
var req = createCatalogRequest(catalogItem, current.assigned_to, {
    "configuration_item": current.sys_id,
    "short_description": "Request for " + current.name
});

// Get the generated task if needed
var req = createCatalogRequest(catalogItem, user, data);
if (req.request_id) {
    var gr = new GlideRecord('sc_task');
    gr.addQuery('request', req.request_id);
    gr.query();
    if (gr.next()) {
        gs.info('Task: ' + gr.number);
    }
}
