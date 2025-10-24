function onLoad() {

    var targetChoiceField = 'choice_field'; // Set this to the name of the Selectbox variable you want to populate
    g_form.clearOptions(targetChoiceField);

    var catItem = g_form.getUniqueValue();
    var dtChoiceAjax = new GlideAjax('global.GetChoicesFromDT'); // Set this to the name of the script include with the relevant scope
    dtChoiceAjax.addParam('sysparm_name', 'getChoices');
    dtChoiceAjax.addParam('sysparm_cat_item', catItem);
    /*
     * Add an other option parameter, e.g.:
     * dtChoiceAjax.addParam('sysparm_cat_variable', g_form.getValue('some_variable'));
     */
    dtChoiceAjax.getXMLAnswer(setChoices);

    function setChoices(answer) {
        if (answer) {
            var choiceArray = JSON.parse(answer);
            if (choiceArray.length == 0) {
                // Do something if the response is empty
                g_form.setReadOnly(targetChoiceField, false);
                g_form.setMandatory(targetChoiceField, false);
                g_form.setDisplay(targetChoiceField, false);
            } else {
                g_form.setDisplay(targetChoiceField, true);

                // Similarly, you might want to do something if there is only one choice, e.g. set that by default and make the field read-only. 
                var isSingleChoice = choiceArray.length == 1 ? true : false;
                if (isSingleChoice) {
                    g_form.addOption(targetChoiceField, choiceArray[0].value, choiceArray[0].label);
                    g_form.setValue(targetChoiceField, choiceArray[0].value);
                    g_form.setReadOnly(targetChoiceField, true);
                } else {
                    // And finally, if you have multiple options, decide how you want your field to behave
                    g_form.setReadOnly(targetChoiceField, false);
                    g_form.addOption(targetChoiceField, '', '-- None --'); // Adding None option - this is also optional
                    for (i = 0; i < choiceArray.length; i++) {
                        g_form.addOption(targetChoiceField, choiceArray[i].value, choiceArray[i].label, i + 1);
                    }
                    g_form.setMandatory(targetChoiceField, true); 
                }
            }
        } else {
			// What if there was no answer return from the script include at all?
            g_form.setReadOnly(targetChoiceField, false);
            g_form.setMandatory(targetChoiceField, false);
            g_form.setDisplay(targetChoiceField, false);
        }
    }
}
