(function() {
    // fetch the session ID
    var sessionID = gs.getSessionID();

    // query User Session table and output Users last access in UTC time
    var userSession = new GlideRecord('sys_user_session');
    userSession.addQuery('id', sessionID);
    userSession.query();
    while ( userSession.next() ) {
        gs.log('Username: '+ userSession.name + '; Last access: ' + userSession.last_accessed);
    }
})();
