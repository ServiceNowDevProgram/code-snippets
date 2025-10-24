// This script submits a catalog item to the ServiceNow Service Catalog using the CartJS API.
// It adds the item to the cart with specified variables and then checks out the cart. 
try {
    var cart = new sn_sc.CartJS();
    // Add the catalog item to the cart

    var newItem = cart.addToCart({
        // Replace 'SYS_ID_OF_CAT_ITEM' with the actual sys_id of the catalog item
        "sysparm_id": "SYS_ID_OF_CAT_ITEM",
        // Specify the quantity of the item
        "sysparm_quantity": "1",
        // Replace 'SYS_ID_OF_REQUESTED_FOR_USER' with the sys_id of the user for whom the item is requested
        "sysparm_requested_for": "SYS_ID_OF_REQUESTED_FOR_USER",
        // Add any necessary variables in the variables object
        "variables": {
            "variable_name1": "value",
            "variable_name2": "value",
            "variable_name3": "value"
        }
    });

    if (newItem) {
        // Checkout the cart to submit the order
        var checkoutInfo = cart.checkoutCart();
        gs.info('Catalog item submitted successfully: ' + JSON.stringify(checkoutInfo));
    } else {
        gs.warn('Failed to add catalog item to cart.');
    }


}
catch (e) {
    // Catch any unexpected errors and log them
    gs.error('Unexpected error while submitting catalog item: ' + e.message);
}



