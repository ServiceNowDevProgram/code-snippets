var gr=new GlideRecord("sys_user");
gr.addEncodedQuery('departmentISEMPTY'); //User who have the Department is empty 
//gr.setLimit(5);
gr.query();
while(gr.next())
{
	var urole=new GlideRecord('sys_user_has_role');
	urole.initialize();
	urole.user=gr.sys_id;
	urole.role='b3dd3ccec32203003e76741e81d3ae95'; //Role SysID
	urole.insert();
	gs.print("Added role to user : "+gr.name);

}
