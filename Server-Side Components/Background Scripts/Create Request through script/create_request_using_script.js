
var cart = new sn_sc.CartJS();
//define variables
var itemDetails = {
	'sysparm_id': 'catalog_item_sys_id',
    'variables': {
        'requested_for': 'user_sys_id'
		/*
		.
		.
		remaining variables
		.
		.
		*/
    }
};

// Add item to cart (returns item sys_id within the cart)
var cartItem = cart.addToCart(itemDetails);
gs.info('Added catalog item to cart: ' + cartItem);

// -- Place the order ---
var order = cart.checkoutCart();
gs.info('Order placed successfully. Request Sys ID: ' + order.request_id);
