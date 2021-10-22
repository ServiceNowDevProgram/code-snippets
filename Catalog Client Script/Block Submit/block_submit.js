//Block the user from submitting the form based on variable answer
function onSubmit() {
  var someVariable = g_form.getValue("someVariable");
  if(someVariable == 'No'){
	alert('You can only use this form for someReason.  Review someInstructions');
    return false; // this stops user from submitting the form
    }
  return true; // allow form submit
}

