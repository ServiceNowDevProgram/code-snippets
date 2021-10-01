function onChange(control, oldValue, newValue, isLoading) {
    //Set the mandatory checkbox variable names and total mandatory count here
    var mandatoryVars = ['option1', 'option2', 'option3', 'option4', 'option5'];
    var variableToShow = 'someothervariable';
    var requiredCount = 2;
    var actualCount = 0;
    for (var x = 0; x < mandatoryVars.length; x++) {
        if (g_form.getValue(mandatoryVars[x]) == 'true') {
            actualCount++;
        }
    }
    if (requiredCount <= actualCount) {
        g_form.setDisplay(variableToShow, true);
    } else {
        g_form.setDisplay(variableToShow, false);
    }
}