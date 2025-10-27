// This code_snippet.js script automatically create a Depends on::Used by relationship when a new server record is created. This business rules run after insert on Server table
(function executeRule(current) {
    var rel = new GlideRecord('cmdb_rel_ci');
    rel.initialize();
    rel.parent = current.sys_id; // server
    rel.child = current.u_application; // app reference
    rel.type = 'Depends on::Used by';
    rel.insert();
})(current);
