(function executeRule(current, previous) {
  //when the priority field changes
    if (current.priority.changes()) {
        var task = new GlideRecord('change_task');
        task.addQuery('change_request', current.sys_id);//Find all tasks related to this Change Request
        task.query();
        while (task.next()) {
            task.priority = current.priority; //Update the task priority
            task.update();
        }
    }
})(current, previous);
