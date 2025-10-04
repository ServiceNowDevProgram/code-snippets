(function() {
	data.table = input.table || $sp.getParameter("table");
	data.sys_id = input.sys_id || $sp.getParameter("sys_id");
	
	data.url = "/nav_to.do?uri="+data.table+".do?sys_id="+data.sys_id;
	
	data.role = false;
	if (gs.hasRole("itil")){
		data.role = true;
	}
})();
