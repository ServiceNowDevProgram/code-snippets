createUserRoles();
function createUserRoles(){
var gr = new GlideRecord('sys_user_has_role');
gr.addQuery('user', '<old sys id for that user instance>'); //old sys_id
gr.query();
while(gr.next()){
var gr1 = new GlideRecord('sys_user_has_role');
gr1.initialize();
gr1.user = '<new sys id for that user instance>';//new user sys_id
gr1.role = gr.role;
gr1.insert();
}
}
