function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    var res = g_form.getElement('close_notes');
    if (newValue == 6)
        res.placeholder = "1. Root Cause" + "\n" + "2. Steps taken" + "\n" + "3. Resolution provided"; //Placeholder text as required
    else
        res.placeholder = "";
}
