(function() {
    /*
    Code will get table and sys_id parameter from url and create url for platform and workspace(defined in option schema).
    This widget can be used in any page having sys_id and table in url , eg: ticket page.
    */
    data.table = $sp.getParameter("table"); // get table from url
    data.sys_id = $sp.getParameter("sys_id"); // get sys_id from url

    var tableWorkspaceMapping = JSON.parse(options.define_workspace); // get the table to workspace mapping from instance options.
    Object.keys(tableWorkspaceMapping).forEach(function(key) {
        if (key == data.table)
            data.workspace_url = "now/" + tableWorkspaceMapping[key] + "/record/" + data.table + "/" + data.sys_id; // if table to workspce mapping is found, the create workspace URL.
        else
            data.workspace_url = "now/sow/record/" + data.table + "/" + data.sys_id; // open in SOW
    });
    data.platform_url = "/nav_to.do?uri=" + data.table + ".do?sys_id=" + data.sys_id;

    data.role = false;
    if (gs.hasRole("itil") && data.table && data.sys_id) { // only visible to users with itil role and if url has required parameters.
        data.role = true;
    }
})();
