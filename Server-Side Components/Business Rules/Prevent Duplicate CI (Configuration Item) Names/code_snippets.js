// Business Rule to Block users from saving a CI with a duplicate name but different class
// Before Insert Business Rule on cmdb_ci table
(function executeRule(current, previous /*null when async*/) {

    var ci = new GlideRecord('cmdb_ci');
    ci.addQuery('name', current.name);
    ci.addQuery('sys_id', '!=', current.sys_id);
    ci.query();

    if (ci.next()) {
        gs.addErrorMessage('A Configuration Item with this name already exists!');
        current.setAbortAction(true);
    }

})(current, previous);
