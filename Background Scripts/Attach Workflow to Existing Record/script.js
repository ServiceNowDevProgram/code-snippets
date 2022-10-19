//add table name, encrypted query, and workflow sys_id you want to attach to the record(s)

//example data
var table = "sc_req_item";
var encQuery =
  "active=true^cat_item=a01e54b3dbb46340cd5af9041d961958^numberINRITM0028376,RITM0028370,RITM0028310,RITM0028234,RITM0028385)";
var workflow_sys_id = "[enter workflow sys_id here]";

var task = new GlideRecord(table);
task.addEncodedQuery(encQuery);
task.query();

while (task.next()) {
  var wf = new Workflow();
  var context = wf.startFlow(workflow_sys_id, task, task.update());
}
