logOutAllUsers('admin'); // Admin user is ignored.

function logOutAllUsers(ignoreUser) {
    var logoutCounter = 0;
    var grSession = new GlideRecord("v_user_session");
    if (ignoreUser && ignoreUser != '') {
        grSession.addQuery("user", "!=", ignoreUser);
    }
    grSession.query();

    while (grSession.next()) {
        var username = grSession.user;

        // Try to find the user record, based on their username.
        var grUser = new GlideRecord("sys_user");
        grUser.addQuery("user_name", username);
        grUser.setLimit(1);
        grUser.query();

        if (grUser.next()) {
            // Logout the user
            gs.print("Logging out session for user " + username + ".");
            logoutCounter += 1;
            grSession.locked = true;
            grSession.update();
        }
    }
    gs.print("Completed logout of " + logoutCounter + " users.");
}