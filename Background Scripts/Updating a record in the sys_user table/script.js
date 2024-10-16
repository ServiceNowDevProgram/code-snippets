var grUser = new GlideRecord('sys_user');

if (grUser.get('62826bf03710200044e0bfc8bcbe5df9')) {
    grUser.user_name = 'test.user';
    grUser.first_name = 'test';
    grUser.last_name = 'user';
    grUser.email = 'test.user@servicenow';
    grUser.update();
} else {
    gs.info('Record not found.');
}
