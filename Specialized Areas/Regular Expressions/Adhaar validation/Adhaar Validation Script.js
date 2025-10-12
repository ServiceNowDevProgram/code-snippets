function onSubmit() {

    g_form.hideFieldMsg('adhaar'); // hide previous field mesage.
    /*
    Adhaar validation script.
	Adhaar is a 12 digit unique identification number issues by UIDAI in India for Indian Residents.
    /^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$/
    // ^ → Start of the string
    // [2-9] → The first digit must be between 2 and 9
    // [0-9]{3} → Followed by exactly 3 digits (0–9)
    // [0-9]{4} → Followed by exactly 4 digits (0–9)
    // [0-9]{4} → Followed by exactly 4 digits (0–9)
    // $ → End of the string
    */

    var adhrNum = g_form.getValue('adhaar'); // adhaar variable name
    var adharReg = /^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$/; // adhaar regex
    var regex = new RegExp(adharReg);

    if (!regex.test(adhrNum)) {
        g_form.clearValue('adhaar'); // clear field value
        g_form.showFieldMsg('adhaar', "Please enter valid adhaar number", 'error', true);
        return false; // stop form submission
    }

}
