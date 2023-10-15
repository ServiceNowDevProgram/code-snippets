/*
Table: sc_req_item
When to run: after update
Condition: current.comments.changes() && gs.isInteractive() 
*/

var sc_task_gr = new GlideRecord('sc_task');

//Retrieve all the SCTASKs with the current RITM is aprent.
sc_task_gr.addQuery('request_item',current.sys_id);
sc_task_gr.query();

while(sc_task_gr.next()){
  sc_task_gr.comments = current.comments;
  sc_task_gr.update();
}
