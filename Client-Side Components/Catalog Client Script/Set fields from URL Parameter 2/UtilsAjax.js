var UtilsAjax = Class.create();
UtilsAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

  getTaskNumber: function() {
    var taskId = this.getParameter('sysparm_task_id');
    gs.debug('=== Camacho UtilsAjax = Received the sys_id ' + taskId);
    return JSON.stringify(new KMXOUtils().getTaskNumber(taskId));
    
  },
    type: 'UtilsAjax'
});