//use this script to update a variable value on one or more RITM records
var ritm = new GlideRecord('sc_req_item');
//ritm.addQuery... to return one or a subset of records
ritm.query();
while(ritm.next()){
	var mtom = new GlideRecord('sc_item_option_mtom');
	mtom.addQuery('request_item', ritm.sys_id.toString());
	mtom.addQuery('sc_item_option.item_option_new', '92bdf4be97857d189d0372e11153af08'); //sys_id of a specific variable to update
	mtom.query();
	if(mtom.next()){
		var item = new GlideRecord('sc_item_option');
		item.addQuery('sys_id', mtom.sc_item_option.toString());
		item.query();
		if(item.next()){		
			item.value = '83d36f44974d71909d0372e11153af5f'; //new value to be assigned, depending on variable type (reference type used here)
			item.update();	
		}
	}
}
