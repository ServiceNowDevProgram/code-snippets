//Block the user from submitting the form based on variable answer
function onSubmit() {
  var VariableName = 'someVariable';
  var VariableVal = g_form.getValue(VariableName);
	    // Basic validation
    if (!VariableVal) {
        g_form.showFieldMsg(VariableName, 'Please answer this question before submitting.', 'error');
        return false;
    }
  if(VariableVal == 'No'){
	var gm = new GlideModal('glide_warn',false);
        gm.setTitle("Submit Blocked! You can only use this form for someReason.  Review someInstructions");
        gm.render();
    	return false; // this stops user from submitting the form
    }
  return true; // allow form submit
}

