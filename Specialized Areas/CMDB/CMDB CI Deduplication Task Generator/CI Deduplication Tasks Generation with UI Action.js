//UI Action for Create De-duplicate Tasks 
//Onclick showConfirmationDialog

function showConfirmationDialog() {
var entries = g_list.getChecked();
var sysIDs = entries.split(',');

var con1 = confirm('Total number of Selected CIs ' + sysIDs.length + '. Click OK to create De-duplicate task');

if (con1) {
alert(sysIDs);
var ga = new GlideAjax('createDuplicateCITask');
ga.addParam('sysparm_name', 'createDeDupTask');
ga.addParam('sysparm_entry_ids', entries);
ga.getXML(getDupTasks);
}

function getDupTasks(response) {

var answer = response.responseXML.documentElement.getAttribute("answer");
if (answer == null) {
alert('Failed to create Remediate Duplicate Task. Selected CIs are already part of an open Remediate Duplicate Task');
} else {
var url1 = 'reconcile_duplicate_task.do?sys_id=' + answer;
var con = confirm('The De-duplicate task is created. Click OK to redirect to De-duplicate task record');
if (con) {
location.href = url1;
}
}
}
}

//Script Include

var createDuplicateCITask = Class.create();
createDuplicateCITask.prototype = Object.extendsObject(AbstractAjaxProcessor, {
createDeDupTask: function() {
var entries = this.getParameter('sysparm_entry_ids');

var dupTaskUtil = new CMDBDuplicateTaskUtils();
var deDupTaskID = dupTaskUtil.createDuplicateTask(entries);

return deDupTaskID;

},

type: 'createDuplicateCITask'
});

 
