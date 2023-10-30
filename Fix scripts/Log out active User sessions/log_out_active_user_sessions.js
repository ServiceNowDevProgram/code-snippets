function logOutActiveUserSessions(live_run) {
    var usernames_to_logout = getUniqueUsernamesWithActiveSessions();
    logoutSessionsForEachUsername(usernames_to_logout, live_run);
    gs.info(
        'Live run: {0}: Logged out sessions for the following users:\n{1}',
        live_run,
        JSON.stringify(usernames_to_logout, null, 2)
    );
}
function getUniqueUsernamesWithActiveSessions() {
    /**
     * We use an aggregate so we can groupBy username to return
     * a unique list of usernames. A user could have multiple active 
     * sessions, but the method to end user sessions locks out all 
     * sessions for that user, so there is no need to run it for 
     * each session they have.
     */
    var active_sessions_agg = new GlideAggregate('sys_user_session');
    // Filter to currently valid sessions
    active_sessions_agg.addQuery('invalidated', 'NULL');
    // Filter out non-user sessions eg a non-interactive system/guest session
    active_sessions_agg.addQuery('name', '!=', 'NULL');
    // Filter out sessions of current user. You could also exlude any 
    // users you wanted to this way.
    applyExcludedUsersFilter(active_sessions_agg);
    active_sessions_agg.groupBy('name');
    active_sessions_agg.query();
    var unique_usernames = [];
    while (active_sessions_agg.next()) {
        unique_usernames.push(active_sessions_agg.name.toString());
    }
    return unique_usernames;
}
function applyExcludedUsersFilter(user_sessions_gr) {
    var current_user_user_id = gs.getUserName();
    var excluded_users = [
        current_user_user_id,
        'Special.Person.1',
        'Special.Person.2'
    ];
    user_sessions_gr.addQuery(
        'name',
        'NOT IN',
        excluded_users
    );
}
function logoutSessionsForEachUsername(usernames, live_run) {
    for (var i = 0; i < usernames.length; i++) {
        logoutSessionsForUsername(usernames[i], live_run);
    }
}
function logoutSessionsForUsername(username, live_run) {
    if (live_run === true) {
        GlideSessions.lockOutSessionsInAllNodes(username);
        return;
    }
    gs.info(
        'Live run: {0}: would logout sessions for {1}',
        JSON.stringify(live_run), // Differentiate strings from booleans
        username
    );
}

var live_run = false;
logOutActiveUserSessions(live_run);