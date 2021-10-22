(function execute(inputs, outputs) {
  
  var grRequestedItem = new GlideRecord("sc_req_item");
  grRequestedItem.get(inputs.req);
  
  var jsonObj={};
  for (var prop in grRequestedItem.variables) {
    jsonObj[prop] = grRequestedItem.variables[prop].toString();
  }
  
  outputs.json = JSON.stringify(jsonObj);

})(inputs, outputs);
