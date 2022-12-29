(function executeRule(current, previous /*null when async*/) {

	// Add your code here
    var ci = current.cmdb_ci;
    //var ciname = current.cmdb_ci.getDisplayValue();
    var gr1 = new GlideRecord("cmdb_ci_query_based_service");
    gr1.addQuery('sys_id', ci);
    gr1.query();
    if (gr1.next()) {
        var groupName = gr1.cmdb_group;
        gs.addInfoMessage("CI Group Name is " + groupName);
        var gr2 = new GlideRecord("cmdb_group");
        gr2.addQuery('sys_id', groupName);
        gr2.query();
        if (gr2.next()) {
            var gr3 = new GlideRecord("cmdb_group_contains_ci");
            gr3.addQuery('group', gr2.sys_id);
            gr3.query();
            while (gr3.next()) {

                var gr4 = new GlideRecord("task_ci");
                gr4.initialize();
                gr4.ci_item = gr3.configuration_item;
                gr4.grp=gr3.group;
                gr4.task = current.sys_id;
                gr4.insert();
            }

        }

    }


})(current, previous);