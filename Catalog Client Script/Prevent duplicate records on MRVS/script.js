function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	
	var MRVS_FIELD = "field_name_here"; //Multi row variable set name
	
	var MRVS = (g_service_catalog.parent.getValue(MRVS_FIELD).length != 0) ? JSON.parse(g_service_catalog.parent.getValue(MRVS_FIELD)) : [];
	
	//If the MRVS is empty - exit
	if(MRVS.length == 0)return;
	
	var valueExists = MRVS.some(function(obj){
		return obj.Variable_Name == newValue; // Reference variable name which needs to be unique
	});
	
	if(valueExists){
		g_form.showFieldMsg(MRVS_FIELD , "Field must be unique");
	}


}
