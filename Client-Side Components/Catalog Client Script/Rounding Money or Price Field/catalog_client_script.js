function onChange(control, oldValue, newValue, isLoading) {

    //Value for increment rounding
    var roundTo = [ROUNDING INCREMENT];

    //Standard onChange code + if the value is now empty, return
    if (isLoading || newValue == '') return;

    //Get the existing value, and remove the $, if it exists
    var existingVal = newValue.replace('$', '');

    //Make sure the field contains a valid numerical value
    if(!Number.isInteger(parseInt(existingVal))) return;

    //Round up if not a multiple of the increment
    if(existingVal % roundTo !=0) {

        //Calculate the rounded value
        var newVal = (Math.ceil(existingVal/roundTo)*roundTo);
        
        //Set the value of the field to the new, rounded value
        g_form.setValue('[VAR_NAME]', "$"+ newVal);

        //Show a message beneath the field indicating it was rounded, and the new value
        g_form.showFieldMsg('[VAR_NAME]', "Rounded $" + existingVal + " to $" + newVal);
    }
} 