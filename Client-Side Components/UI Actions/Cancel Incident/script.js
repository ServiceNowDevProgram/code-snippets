function cancelIncident(){
	var gm = new GlideModal("glide_ask_standard", false, 600); // glide modal to get the confirmation
	gm.setPreference("title", "Are you sure you wanna cancel incident!!!");
	gm.setPreference("onPromptComplete", function() {
		gsftSubmit(null,g_form.getFormElement(),'cancel_incident');}); //calling same ui action
	gm.render();
	
}

if(typeof window == 'undefined'){
	serverCancel();
}

function serverCancel(){
	current.state = '8'; //setting the state to canceled
	current.update();
}
