

(function() {
  // fetch the session ID
  var sessionID = gs.getSessionID();

  // query User Session table and output Users last access in UTC time
  var userSession = new GlideRecord('sys_user_session');
  userSession.addQuery('id', sessionID);
  userSession.query();
  while ( userSession.next() ) {
      var user = new GlideRecord('sys_user');
      user.addQuery('user_name',userSession.name);
      user.query();
      while ( user.next() ) {
          gs.log('User ID: ' + user.user_name + '; Name: ' + user.name + '; Last access: ' + userSession.last_accessed);
          
      }
  }
})();
