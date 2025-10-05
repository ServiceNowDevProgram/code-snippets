var userGr = new GlideRecord('sys_user');
userGr.query();
while (userGr.next()) {
    var incGr = new GlideRecord('incident');
    incGr.addQuery('caller_id', userGr.sys_id);
    incGr.query();
    while (incGr.next()) {
        incGr.u_department = userGr.department; // Assuming custom field u_department
        incGr.update();
    }
}
