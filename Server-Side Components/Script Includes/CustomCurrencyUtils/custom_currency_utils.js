var CustomCurrencyUtils = Class.create();
CustomCurrencyUtils.prototype = {
    initialize: function() {},

    /*
    	Parameters:
    		record_id : sys_id of the record
    		field : name of the currency/price field for which the reference currency value is needed
    	
    	Returns: Object
    		- Currnecy and Value : returns currncy code and value of the field in reference currency
    		- false	: if the record not found  or field is invalid
    */

    getReferenceValue: function(record_id, field) {
        var priceGr = new GlideRecord('fx_price');
        priceGr.addQuery('id', record_id);
        priceGr.addQuery('field', field);
        priceGr.setLimit(1);
        priceGr._query();

        if (priceGr._next()) {
            return {
                currency: priceGr.getValue('reference_amount'),
                value: priceGr.getValue('reference_currency')
            }
        }
        return false;
    },

    type: 'CustomCurrencyUtils'
};
