function onLoad() {
  var userHasRole = g_user.hasRole('case_manager'); // Check if user has specific role

  if (userHasRole) {
    g_form.setSectionDisplay('budget_approval', true);  // Show section if user has specific role
  } else {
    g_form.setSectionDisplay('budget_approval', false);
  }
}
