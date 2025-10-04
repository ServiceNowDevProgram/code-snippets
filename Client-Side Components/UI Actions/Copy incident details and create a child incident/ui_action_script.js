var gr = new GlideRecord('incident');
gr.initialize();
gr.short_description = current.short_description;  //copy short description field
gr.caller_id = current.caller_id;  //copy caller id field
//you can copy few more fields as per requirement
gr.parent_incident = current.sys_id;
gr.work_notes = "This incident is a child and copy of " + current.number;  //you can customize work notes if needed
gr.insert();

action.setRedirectURL(gr);  //use this line if you want to redirect to newly created child incident after execution
action.setRedirectURL(current)  //use this line if you want to stay in parent incident after execution.
