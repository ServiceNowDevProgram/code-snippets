var users = [];
var gr = new GlideRecord('sys_user');
gr.addNullQuery('email');
gr.query();
while(gr.next())
{
  users.push(gr.name);
}
gs.info("Users without email are : " +users);
