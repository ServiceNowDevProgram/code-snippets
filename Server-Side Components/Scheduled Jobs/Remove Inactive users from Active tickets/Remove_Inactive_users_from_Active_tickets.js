var arr =[];
var gr = new GlideRecord('sys_user');
gr.addQuery('active',false);
gr.query();
//gs.log('step 1');
while(gr.next()){
arr.push(gr.getValue('sys_id') + ''); //query inactive users and push them to the array
}
for(var i=0; i < arr.length; i++){
var inc = new GlideRecord('incident');
inc.addQuery('active',true);  
inc.addQuery('state','!=',6);   
inc.addQuery('state','!=',3);
inc.addQuery('state','!=',7);
inc.addQuery('assigned_to',arr[i]);
inc.query();
while(inc.next()){ //query active incidents with state is not 6,3,7
inc.assigned_to = '';//set the assign to empty
inc.update();
	gs.eventQueue('incident.assignedto.inactive',inc,gs.getUserName(),gs.getUserName()); //trigger the notification event for Assignment group Manager
}
}
