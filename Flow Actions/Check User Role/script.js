(function execute(inputs, outputs) {
  var roleGR = new GlideRecord("sys_user_has_role"); //query the record sys_user_has_role
  roleGR.addQuery("user", inputs.userid);
  roleGR.query();

  outputs.user_has_role = false;

  while (roleGR.next()) {
    if (roleGR.role.name == inputs.role) { //checking the role of the user if same as the role given in flow 
      outputs.user_has_role = true; // setting output variable user_has_role to true
    }
  }
})(inputs, outputs);
