/* Scenario :
When a new CI (like an Application Server) is discovered or updated, automatically create “Runs on”, “Depends on”, 
or “Connected to” relationships based on specific patterns.*/

// Table: cmdb_ci_appl | BR: after insert/update
(function executeRule(current, previous) {
    if (current.u_host) {
        var rel = new GlideRecord('cmdb_rel_ci');
        rel.initialize();
        rel.parent = current.u_host;     // parent = server
        rel.child = current.sys_id;      // child = application
        rel.type = 'Runs on::Runs';      // relationship type
        rel.insert();
    }
})(current, previous);
