// Add below code to Before BR
var attach = new GlideRecord('sys_attachment');
attach.addQuery('table_sys_id', current.sys_id);
attach.addQuery('table_name', current.getTableName());
attach.query();
if (!attach.next()) {
		gs.addErrorMessage("Cannot submit without an attachment.");
		current.setAbortAction(true);
	}
