fixModelNames();

function fixModelNames() {
	var modelGR = new GlideRecord("cmdb_model");
	modelGR.orderBy("display_name");
	modelGR.query();
	while (modelGR.next()) {
		var modelName = modelGR.name;
		if (modelGR.sys_class_name == "cmdb_software_product_model") {
			var swModelGR = new GlideRecord("cmdb_software_product_model");
			if (swModelGR.get(modelGR.sys_id)) {
				modelName = swModelGR.product.getDisplayValue();
			}
		}
		
		var platform = '';
		if(!gs.nil(modelGR.platform) && modelGR.platform != 'anything'){
			platform  = modelGR.getDisplayValue("platform");
		}
		
		var language = '';
		if(!gs.nil(modelGR.language) && modelGR.language != '832bec5493212200caef14f1b47ffb56'){
			language =  modelGR.getDisplayValue("language");
		}
				
		var values = [modelGR.manufacturer.getDisplayValue(), modelName, modelGR.version, modelGR.edition, platform,language];
		var displayName = '';
		
		if (values[1].toLowerCase().indexOf(values[0].toLowerCase()) != -1 && 'true'.equals(gs.getProperty('glide.cmdb_model.display_name.shorten')))
			values[0] = '';
		
		for (var i = 0; i < values.length; i++){
			if (values[i] != undefined && values[i] != '')
				displayName += ' ' + values[i];
		}
		
		modelGR.display_name = displayName.trim();
		modelGR.update();
	}
}
