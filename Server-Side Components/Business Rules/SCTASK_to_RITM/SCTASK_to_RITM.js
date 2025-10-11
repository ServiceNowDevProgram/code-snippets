/*
Table: sc_task
When to Run: after update
Condition: current.comments.changes() && gs.isInteractive()
*/

//Script to update comments on RITM.

var ritmGr = new GlideRecord('sc_req_item');
if(ritmGr.get(current.request_item.sys_id)){
  ritmGr.comments = current.comments;
}
