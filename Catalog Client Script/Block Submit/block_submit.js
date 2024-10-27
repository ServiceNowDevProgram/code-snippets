//Block the user from submitting the form based on variable answer
function onSubmit() {
  var someVariable = g_form.getValue("someVariable");
  if(someVariable == 'No'){
	var gm = new GlideModal('glide_warn',false);
        gm.setTitle("Submit Blocked! You can only use this form for someReason.  Review someInstructions");
        gm.render();
    	return false; // this stops user from submitting the form
    }
  return true; // allow form submit
}

