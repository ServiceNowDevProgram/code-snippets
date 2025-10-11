var item = new GlideRecord("sc_req_item");
item.addQuery("sys_id","31cd7552db252200a6a2b31be0b8f55c"); // sys_id of the RITM
item.query();
if(item.next()){
  var approval = new GlideRecord("sysapproval_approver");
  approval.addQuery("document_id",item.getUniqueValue()); // Get the sys_Id of document Id field on approval table
  approval.query();
  if(approval.next()){
    approval.state="Rejected";
    item.apprpval="Rejected";
  }
  item.setWorkflow(false);
  item.update();
  approval.update(); // Update the record on approval table.
}
