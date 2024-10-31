(function cleanupInactiveUsers() {
    // Query for users inactive for over 6 months
    var user = new GlideRecord('sys_user');
    user.addEncodedQuery('last_login_timeRELATIVELE@dayofweek@-180');
    user.query();

    // Disable each inactive user account
    while (user.next()) {
        user.active = false;
        user.update();
    }
})();
