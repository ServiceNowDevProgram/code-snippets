(function executeRule(current, previous /*null when async*/) {
    var OPEN_STATE = 1;
    var WORK_IN_PROGRESS_STATE = 2;

    var gr = new GlideRecord("sc_task");
    gr.addQuery('request_item', current.sys_id);
    gr.addQuery('state', OPEN_STATE);  // Only fetch tasks in Open state
    gr.query();

    while (gr.next()) {
        gr.setValue('state', WORK_IN_PROGRESS_STATE);  // Update the task to Work in Progress
        gr.update();
        gs.log('Task ' + gr.number + ' updated from Open to Work in Progress');
    }
})(current, previous);
