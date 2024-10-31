var recordId = "ritm_sys_id";
var grRitm = new GlideRecord("sc_req_item");
grRitm.addQuery("sys_id", recordId);
grRitm.query();
if (grRitm.next()) {
new Workflow().restartWorkflow(grRitm);
}
