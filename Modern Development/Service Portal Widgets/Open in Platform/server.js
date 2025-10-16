(function() {
    /*
    Code will get table and sys_id parameter from url and create url for platform and sow.
    This widget can be used in any page having sys_id and table in url , eg: ticket page.
    */
    data.table = input.table || $sp.getParameter("table"); // get table from url
    data.sys_id = input.sys_id || $sp.getParameter("sys_id"); // get sys_id from url

    data.platform_url = "/nav_to.do?uri=" + data.table + ".do?sys_id=" + data.sys_id;
    data.sow_url = "now/sow/record/" + data.table + "/" + data.sys_id;

    data.role = false;
    if (gs.hasRole("itil") && data.table && data.sys_id) { // only visible to users with itil role and if url has required parameters.
        data.role = true;
    }
})();
