(function() {
if(input){
  if (input.action == "add") {
  	if(!input.text){
		gs.addInfoMessage("Please enter value in text area");
		return;
	}
	     var rec = new GlideRecord('u_sticky_notes'); 
       rec.initialize();
		   rec.u_short_description = input.text;
			 rec.u_color = input.newColor;
        rec.insert();
	}
  if (input.action == "remove") {
	   var del = new GlideRecord('u_sticky_notes');
        if (del.get(input.i)) {
          del.deleteRecord();
        }
  }
}
	
	var gr = new GlideRecord('u_sticky_notes');
	gr.orderByDesc('sys_created_on');
	gr.query();
	data.notes = [];
	while(gr.next()){
		  data.notes.push({
      sys_id: gr.getUniqueValue(),
      text: gr.getValue("u_short_description"),
      color: gr.getValue("u_color"),
      created_on: gr.getDisplayValue("sys_created_on")
    });
	}
})();
