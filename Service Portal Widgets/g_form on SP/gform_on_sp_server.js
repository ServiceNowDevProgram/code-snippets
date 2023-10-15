(function() {
	data.table = $sp.getParameter("table");
	data.sys_id = $sp.getParameter("sys_id");
	data.view = $sp.getParameter("view");

    data.f = $sp.getForm(data.table, data.sys_id, data.query, data.view, false);
})();