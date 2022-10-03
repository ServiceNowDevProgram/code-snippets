  var attach = new GlideRecord('sys_attachment');
	attach.addQuery('table_sys_id', 'sys_id');
	attach.addQuery('table_name', 'table_name');
	attach.query();
	if (!attach.next()) {
		gs.addErrorMessage("Cannot submit without attachment.");
		current.setAbortAction(true);
    return false;
	}
