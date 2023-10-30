var CheckMRVSDetails = Class.create();
CheckMRVSDetails.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	checkMRVS: function(){
		var itemID = this.getParameter('sysparm_itemID');
		var grMultiRow = new GlideRecord('io_set_item');
		grMultiRow.addEncodedQuery('variable_set.type=one_to_many'); // Variable Set is MRVS
		grMultiRow.addQuery('sc_cat_item',itemID);
		grMultiRow.setLimit(1);
		grMultiRow.query();
		if(grMultiRow.next()){
			return true;
		}
		return false;
	},
	
	
	
    type: 'CheckMRVSDetails'
});
