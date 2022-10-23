// GlideAggregate Query is always faster than GlideRecord Query
var grSA = new GlideAggregate('sys_attachment');
grSA.addQuery('table_sys_id', current.sys_id); 
grSA.addQuery('table_name', current.getTableName());
grSA.query();
if (!grSA.next()) {
		 gs.addErrorMessage("Please attach Approvals to submit the request");
		current.setAbortAction(true);
	}
