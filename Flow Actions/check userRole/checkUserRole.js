(function execute(inputs, outputs) {
  var roleGR = new GlideRecord("sys_user_has_role"); // querying sys_user_has_role record
  roleGR.addQuery("user", inputs.userid); // finding the particular user in the record
  roleGR.query();

  outputs.user_has_role = false;

  while (roleGR.next()) {
    if (roleGR.role.name == inputs.role) { //checking if the role of the user is same as the role provided in the flow 
      outputs.user_has_role = true; //setting user_has_role to true
    }
  }
})(inputs, outputs);
