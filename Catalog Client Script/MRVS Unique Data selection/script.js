//On Change of MRVS reference variable name on which you need to set the unique data selection

function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	
	var MRVS_FIELD = "field_name_here"; // Multi Row Variable set name
	
	var MRVS = (g_service_catalog.parent.getValue(MRVS_FIELD).length != 0) ? JSON.parse(g_service_catalog.parent.getValue(MRVS_FIELD)) : [];
	
	//If the MRVS is empty - exit
	if(MRVS.length == 0)return;
	
	var valueExists = MRVS.some(function(obj){
		return obj.reference_variable_name == newValue; //Reference Variable name which you need to make unique data selection
	});
	
	if(valueExists){
		g_form.showFieldMsg(MRVS_FIELD , "Field must be unique");
	}


}
