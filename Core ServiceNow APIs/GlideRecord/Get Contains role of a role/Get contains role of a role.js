var gr = new GlideRecord('sys_user_role_contains');
gr.addQuery('role.name', '<role_name>'); //replace <role_name> with the name of a role to which you need to get all the conatins role
gr.query();
while(gr.next()){
  gs.info(gr.contains.name.toString());
}
