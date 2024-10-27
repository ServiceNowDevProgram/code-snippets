var CreateMultipleRITMSFromMRVS = Class.create();
CreateMultipleRITMSFromMRVS.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    addRITM: function() {
        var mrvsList = this.getParameter('sysparm_mrvs_list');
        var itemSysId = gs.getProperty('property_id'); //System Property containing the sys_id of the Catalog Item
        var obj = JSON.parse(itemList);

		//Initialize the variables of your Catalog Item
		var variables = {
            'variable1': '',
            'variable2': '',
            'variable3': ''
        };

        var total = obj.length;
        for (var i = 0; i < total; i++) {
            variables['variable1'] = obj[i]['mrvs_variable_1'];
            variables['variable2'] = obj[i]['mrvs_variable_2'];
            variables['variable3'] = obj[i]['mrvs_variable_3'];
            var cart = new sn_sc.CartJS();
            cart.setRequestedFor(gs.getUserID());
            var item = {
                'sysparm_id': itemSysId,
                'sysparm_quantity': '1',
                'variables': variables
            };
            var cartDetails = cart.addToCart(item);
        }
        var cartSubmit = cart.checkoutCart();
        return cartSubmit.request_id;
    },

    type: 'CreateMultipleRITMSFromMRVS'
});
