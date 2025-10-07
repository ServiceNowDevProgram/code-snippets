function popUpClientScript(){
	
	var actionCallbackOK = function() {
        	gsftSubmit(null,g_form.getFormElement(),'sys_demoaction'); // calling server ui action to update state
    	};
    	var actionCallbackCancel = function() {
         	//do nothing
    	};

	var gm = new GlideModal('glide_confirm_basic',false); //UI page with logic to confirm
    	gm.setTitle("Are you sure you want to close the attached child incident"); // confirm message to ask for confirmation
	gm.setPreference('onPromptComplete', actionCallbackOK.bind(this)); //bind to local function to take action when selected Ok
    	gm.setPreference('onPromptCancel', actionCallbackCancel.bind(this)); //bind to local function to take action when selected Cancel
    	gm.render();
}
