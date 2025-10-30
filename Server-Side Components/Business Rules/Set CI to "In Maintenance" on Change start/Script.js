(function executeRule(current, previous) {
    if (previous.state != current.state && current.state == 'implement') {
        var ciRel = new GlideRecord('task_ci');
        ciRel.addQuery('task', current.sys_id);
        ciRel.query();
        while (ciRel.next()) {
            var ci = new GlideRecord('cmdb_ci');
            if (ci.get(ciRel.ci_item)) {
                ci.install_status = 4; // In Maintenance
                ci.update();
                gs.info('CI ' + ci.name + ' moved to In Maintenance.');
            }
        }
    }
})(current, previous);
