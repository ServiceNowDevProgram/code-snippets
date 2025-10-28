function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    var panNumber = g_form.getValue("pan_number"); //Get the PAN card information
    var panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // Regex for the PAN Card

    if (panRegex.test(panNumber)) {
        g_form.showFieldMsg("pan_number", "Valid PAN card number.", true); //Valid PAN card enterd populates this message 
    } else {
        g_form.showErrorBox("pan_number", "InValid PAN card number.", true); //In Valid PAN card details enterd populate this message 
    }
}
