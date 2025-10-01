function onLoad() {
    //Script to hide work notes section, when incident is in state NEW

    //Get incident state
    var state = g_form.getValue('state');

    //Check if incident is in state NEW (value = 1)
    if (state == 1) {

        //Hide work notes section 
        g_form.setSectionDisplay('notes', false);
    }
}
