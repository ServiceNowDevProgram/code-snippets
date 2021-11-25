function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    //Client script, which shows how to use mandatoryCheck() function
    //mandatoryCheck() allows validating if all mandatory fields are filled
    //If all mandatory fields are filled it return true, otherwise it returns false

    //Check if all mandatory fields are filled on record
    if (!g_form.mandatoryCheck()) {

        //Example action when not all mandatory fields are filled - display message and remove state field
        var missing = g_form.getMissingFields();
        g_form.addInfoMessage("State field removed, because not all mandatory fields are filled: " + missing);
        g_form.setDisplay('state', false);
    }

}
