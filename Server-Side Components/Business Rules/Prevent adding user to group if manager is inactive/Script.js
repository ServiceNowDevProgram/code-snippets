var user = new GlideRecord('sys_user');
user.addQuery('sys_id', current.group.manager.sys_id);
user.addQuery('active', 'false');
user.query();
if(user.next())
{
    gs.info("Group Manager is inactive");
    current.setAbortAction(true);
}
