function popUpClientScript(){
	var answer = confirm('Are you sure you want to close the attached child incident'); // confirm message to ask for confirmation
	if(answer == true){ //check if answer is true 
		gsftSubmit(null,g_form.getFormElement(),'sys_demoaction'); // calling server ui action to update state
	}
}
