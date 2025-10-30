(function executeRule(current, previous) {
    // Run only when Change is moving to Closed
    if (previous.state != current.state && current.state == 'closed') {

        gs.info('Change ' + current.number + ' closed — updating related CI statuses.');

        // Query all CI relationships for this Change
        var ciRel = new GlideRecord('task_ci');
        ciRel.addQuery('task', current.sys_id);
        ciRel.query();

        while (ciRel.next()) {
            if (ciRel.ci_item) {
                var ci = new GlideRecord('cmdb_ci');
                if (ci.get(ciRel.ci_item)) {

                    // Example: Update CI status
                    ci.install_status = 1; // 1 = In Service (Active)
                    ci.update();

                    gs.info('CI ' + ci.name + ' status updated to In Service for Change ' + current.number);
                }
            }
        }
    }
})(current, previous);
