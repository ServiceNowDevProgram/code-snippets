function onSubmit() {
var changeType = g_form.getValue('type');
var risk = g_form.getValue('risk');
var state = g_form.getValue('state');
var implementationPlan = g_form.getValue('implementation_plan');

// Validate mandatory field
if (!implementationPlan) {
g_form.addErrorMessage('Implementation plan is mandatory before submission.');
return false;
}

// Informational message when in planning state
if (state == '-5') {
g_form.addInfoMessage('Change is currently in planning. Please ensure risk assessment is complete.');
}

// Display colour-coded messages based on risk
switch (risk) {
case '1':
g_form.addErrorMessage('Critical Risk Change - Requires CAB and Director approval.');
break;
case '2':
g_form.addHighMessage('High Risk Change - Requires CAB review.');
break;
case '3':
g_form.addModerateMessage('Moderate Risk Change - CAB notification needed.');
break;
case '4':
g_form.addLowMessage('Low Risk Change - Auto approval possible.');
break;
}

// Display success/info messages based on change type
if (changeType == 'Emergency') {
g_form.addSuccessMessage('Emergency Change - Proceed with immediate authorization.');
} else {
g_form.addInfoMessage('Standard Change - Follows the normal approval workflow.');
}

return true;
}
