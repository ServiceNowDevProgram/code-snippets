(function() {
data.messages = [];
if(input){
data.messages = input.messages;
if (input.action == "addMessage") {
data.messages.push(input.message);
	if(!input.message){
		gs.addInfoMessage("Please enter value in text area");
		return;
	}
	   var rec = new GlideRecord('u_sticky_notes'); // 🔹 change this to your table
      rec.initialize();
			rec.u_short_description = input.message;
			rec.u_color = input.newColor;
    //  rec.setValue('u_short_description', input.inputValue); // 🔹 change 'name' to your field
      rec.insert();
	
	
}
if (input.action == "removeMessage") {
data.messages.splice(input.i,1);
	console.log(input.i);
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
