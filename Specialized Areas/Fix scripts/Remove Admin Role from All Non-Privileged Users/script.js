var adminRoleID = 'INSERT_ADMIN_ROLE_SYS_ID';
var gr = new GlideRecord('sys_user_has_role');
gr.addQuery('role', adminRoleID);
gr.query();

while (gr.next()) {
    var userID = gr.user.sys_id + '';
    if (userID !== gs.getUserID()) { // Keep current user safe
        gr.deleteRecord();
    }
}
