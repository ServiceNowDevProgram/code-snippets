(function execute(inputs, outputs) {
  var roleGR = new GlideRecord("sys_user_has_role");
  roleGR.addQuery("user", inputs.userid);
  roleGR.query();

  outputs.user_has_role = false;

  while (roleGR.next()) {
    if (roleGR.role.name == inputs.role) {
      outputs.user_has_role = true;
    }
  }
})(inputs, outputs);

