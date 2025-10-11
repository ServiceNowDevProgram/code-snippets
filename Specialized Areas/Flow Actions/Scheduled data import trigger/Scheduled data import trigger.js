(function execute(inputs, outputs) {
  
  	// Input: sys_id of a scheduled_import_set record
  	// Will execute the scheduled import for the given sys_id
  
  	outputs.returnError = false;
	  var exportGr = new GlideRecord("scheduled_import_set");
  	if(exportGr.get(inputs.importSet)){
      
		SncTriggerSynchronizer.executeNow(exportGr);
      
    } else { // no import set found so return error to main flow
      outputs.returnerror = true;
    }
      
})(inputs, outputs);
