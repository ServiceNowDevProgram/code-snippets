//Script to update comments on RITM.

var ritmGr = new GlideRecord('sc_req_item');
if(ritmGr.get(current.request_item.sys_id))// Use current sys_id of ritm to pull the comments
{

ritmGr.comments=current.comments.getJournalEntry(1);// This gets the latest comment added.
}
