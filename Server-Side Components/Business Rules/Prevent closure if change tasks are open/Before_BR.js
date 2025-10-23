function executeRule(current, previous /*null when async*/){
  if(current.close_code){
    var taskGR = new GlideRecord('change_task');
    taskGR.addQuery('change_request', current.sys_id);
    taskGR.addQuery('state', '!=', '3') // Adjust as needed
    taskGR.query();

  if (taskGR.hasNext()){
    gs.addErrorMessage('You cannot close this change request until all change tasks are closed.');
    current.setAbortAction(true); // Prevent saving the form
   }
 }

})(current, previous);
