(function executeRule(current, previous /*null when async*/) {

	// Add your code here

var mrvs = current.variables.test_var; //get MRVS. Here 'test_var' is my mrvs name.
var total = mrvs.getRowCount(); // get the row count of mrvs
for(var i =0;i<total;i++)
{
  var scTask = new GlideRecord('sc_task');
  scTask.initialize();
  scTask.request_item = current.sys_id;
  scTask.short_description = mrvs[i].name; //set the short description of task with mrvs data. Here 'name' is a variable on my mrvs.
  scTask.insert();
}
})(current, previous);
