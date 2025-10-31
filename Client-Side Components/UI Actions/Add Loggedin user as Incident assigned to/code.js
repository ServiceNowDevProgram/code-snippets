var currentUser = gs.getUserID(); //Getting loggedIn User Id

//Checing wheather user is available or not in Assignee field
if(current.assigned_to == ""){ //checking assigned to is there or not
	current.assigned_to = currentUser; //Setting the current loggedIn user
	current.update(); //updating the record.
	gs.addInfoMessage("Incident has been assigned to You.");
	action.setRedirectURL(current);
} else {
	gs.addErrorMessage("Incident is already assigned");
	action.setRedirectURL(current);
}
