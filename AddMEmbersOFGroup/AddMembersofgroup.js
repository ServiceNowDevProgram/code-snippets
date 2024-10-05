var rec = new GlideRecord('sys_user_group');
 
 
rec.addEncodedQuery('');
 
 
 
rec.query();
 
 
while (rec.next())
 
 
{
 
 
    var rec1 = new GlideRecord('sys_user_grmember');
 
 
    rec1.addQuery('group' , rec.sys_id);
 
 
    rec1.addQuery('user' , '7279f455939e71944c77b6b5fbba1033');   // put the sys_id of "user" here
 
 
    rec1.query();
 
 
if(!rec1.next())
 
 
{
 
 
rec1.initialize();
 
 
rec1.group = rec.sys_id;
 
 
rec1.user = '7279f455939e71944c77b6b5fbba1033'; // put the sys_id of "user 1" here
 
 
rec1.insert();
 
 
gs.log("User group record inserted");
 
 
}
 
 
}
 
 
 
