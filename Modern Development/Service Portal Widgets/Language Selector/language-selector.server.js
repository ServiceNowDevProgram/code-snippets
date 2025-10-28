(function() {
  var user = gs.getUser();
  data.user_id = user.getID();

  var grUser = new GlideRecord('sys_user');
  if (grUser.get(data.user_id)) {
    data.language = grUser.getValue('preferred_language') || 'en'; 
  }
})();
