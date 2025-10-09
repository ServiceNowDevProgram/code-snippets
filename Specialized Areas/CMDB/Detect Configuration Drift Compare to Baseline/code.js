(function executeRule(current, previous) {
    var baseline = new GlideRecord('cmdb_baseline');
    baseline.addQuery('ci', current.sys_id);
    baseline.orderByDesc('sys_created_on');
    baseline.query();

    if (baseline.next()) {
        var drift = false;
        var changes = [];

        if (baseline.ram != current.ram) {
            drift = true; changes.push('RAM');
        }

        if (baseline.cpu_count != current.cpu_count) {
            drift = true; changes.push('CPU');
        }

        if (baseline.os != current.os) {
            drift = true; changes.push('OS');
        }

        if (drift) {
            var log = new GlideRecord('u_drift_log');
            log.initialize();
            log.u_ci = current.sys_id;
            log.u_detected_on = new GlideDateTime();
            log.u_drift_fields = changes.join(', ');
            log.insert();

            gs.eventQueue('ci.drift_detected', current, changes.join(', '));
        }
    }
})(current, previous);
