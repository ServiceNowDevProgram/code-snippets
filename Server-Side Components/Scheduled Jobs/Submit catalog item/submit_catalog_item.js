try {
    // Generate a unique cart ID using GlideGuid
    var cartId = GlideGuid.generate(null);

    // Create a new Cart object with the generated cart ID
    var cart = new Cart(cartId);

    // Add a catalog item to the cart using its sys_id
    var item = cart.addItem('41725b2bc3503210e89b341d050131bc');

    // Check if the item was successfully added
    if (!item) {
        gs.error('Failed to add catalog item to cart.');
    } else {
        // Place the order and get the resulting sc_request GlideRecord
        var rc = cart.placeOrder();

        // Check if the order was successfully placed
        if (!rc) {
            gs.error('Failed to place order.');
        } else {
            // Log success message with the request number
            gs.info('Catalog item submitted successfully. Request Number: ' + rc.number);
        }
    }

} catch (e) {
    // Catch any unexpected errors and log them
    gs.error('Unexpected error while submitting catalog item: ' + e.message);
}