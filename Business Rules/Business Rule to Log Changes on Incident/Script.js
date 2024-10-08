// Business Rule: Log Incident Changes
// Table: incident
// When: Before
// Update: true

(function executeRule(current, previous /*null when async*/) {
    if (current.changes()) {
        var log = new GlideRecord('incident_change_log');
        log.initialize();
        log.incident = current.sys_id;
        log.changed_by = gs.getUserID();
        log.change_time = new GlideDateTime();
        log.changes = current.changes(); // Store the fields that were changed
        log.insert();
    }
})(current, previous);
