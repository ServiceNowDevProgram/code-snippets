//Table: Change Task
// When: After Delete
// When any of the associated change tasks are deleted, calling the flow asynchronously to make the updates.
(function executeRule(current, previous /*null when async*/ ) {
  try {
        var chgTask = new GlideRecord('change_task');
        chgTask.addQuery('change_request', current.change_request);
        chgTask.query();
        if (chgTask.next()) {
            var inputs = {};
            inputs['current'] = chgTask;
            inputs['table_name'] = 'change_task';
            sn_fd.FlowAPI.getRunner().flow('global.calculateActualStartEndDates').inBackground().withInputs(inputs).run();
        }
    } catch (ex) {
        var message = ex.getMessage();
        gs.error(message);
    }
})(current, previous);
