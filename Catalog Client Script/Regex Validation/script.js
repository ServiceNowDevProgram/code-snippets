function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	//Defining the regular expression to validate if the given value is valid email address or not
	var emailValidation = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
	if (!emailValidation.test(newValue)) { 
		g_form.clearValue('VARIABLE_NAME'); // Clear's the variable 
		g_form.showFieldMsg('VARIABLE_NAME', 'Please enter a valid email address', 'error'); // Display a message below variable
		return false; // Stop submission
	}
	return true;
