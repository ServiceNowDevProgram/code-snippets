//set condition field within user query business rule to: gs.getSession().isInteractive() && !gs.hasRole("admin,user_admin,itil")
current.addActiveQuery(); //this will add an active query to the user's sys_user query if the user is in an interactive session and does not have admin, user_admin, or itil roles
