(function execute(inputs, outputs) {
// ... code ...
  var schRec = new GlideRecord("sys_trigger");  
        schRec.name = "Load Data Source: " + inputs.dataSourceID;  
        schRec.trigger_type = 0; // Run Once  
        schRec.script = "new global.LoadIncidents().loadImportSet('" + inputs.dataSourceID + "')";  
          
        var nextAction = new GlideDateTime();  
        nextAction.addSeconds(30); 
        schRec.next_action = nextAction;  
        schRec.insert();  
  
  
})(inputs, outputs);
