function openEmailLogList() {
	var query = '';
	query += 'sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()';
	query += '^notification=' + g_form.getUniqueValue();
	query += '^ORDERBYDESCsys_created_on';
	
	var url = new GlideURL('sys_email_log_list.do');
	url.addParam('sysparm_query' , query);
	g_navigation.open(url.getURL(), '_blank');
}