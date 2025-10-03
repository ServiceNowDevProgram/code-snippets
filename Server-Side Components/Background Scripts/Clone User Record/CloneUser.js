var sourceUser = new GlideRecord('sys_user');

// Replace 'user_name' with the actual username or use sys_id
if (sourceUser.get('user_name', 'john.doe')) {
    var clonedUser = new GlideRecord('sys_user');
    clonedUser.initialize();

    // Copy fields from source user
    clonedUser.name = sourceUser.name + ' (Clone)';
    clonedUser.email = sourceUser.email;
    clonedUser.department = sourceUser.department;
    clonedUser.title = sourceUser.title;
    clonedUser.phone = sourceUser.phone;
    clonedUser.location = sourceUser.location;
    clonedUser.manager = sourceUser.manager;

    // Insert the cloned user record
    var newUserID = clonedUser.insert();
    gs.info('Cloned user created with sys_id: ' + newUserID);
} else {
    gs.info('Source user not found');
}
