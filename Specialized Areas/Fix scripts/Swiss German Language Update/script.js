//edit all labels in sys_translated table
var sys_translated = new GlideRecord("sys_translated");
sys_translated.addQuery("language", "de");
sys_translated.addQuery("label", "CONTAINS", "ß");
sys_translated.query();
if (sys_translated.hasNext()) {
    var counter1 = 0;
    while (sys_translated.next()) {
        var old_label = sys_translated.label;
        if (old_label.indexOf('ß') > -1) { //additional check is needed, since GlideRecord query does not uniquely recognize ß character
            var new_label = old_label.replaceAll("ß", "ss");
            sys_translated.label.setDisplayValue(new_label);
            sys_translated.update();
            counter1++;
        }
    }
    gs.log("in table sys_translated " + counter1 + " records were updated");
}

//edit all labels in sys_ui_message table
var sys_ui_message = new GlideRecord("sys_ui_message");
sys_ui_message.addQuery("language", "de");
sys_ui_message.addQuery("message", "CONTAINS", "ß");
sys_ui_message.query();
if (sys_ui_message.hasNext()) {
    var counter2 = 0;
    while (sys_ui_message.next()) {
        var old_message = sys_ui_message.message;
        if (old_message.indexOf('ß') > -1) { //additional check is needed, since GlideRecord query does not uniquely recognize ß character
            var new_message = old_message.replaceAll("ß", "ss");
            sys_ui_message.message.setDisplayValue(new_message);
            sys_ui_message.update();
            counter2++;
        }
    }
    gs.log("in table sys_ui_message " + counter2 + " records were updated");
}

//edit all labels in sys_documentation table
var sys_documentation = new GlideRecord("sys_documentation");
sys_documentation.addQuery("language", "de");
sys_documentation.addQuery("label", "CONTAINS", "ß").addOrCondition("plural", "CONTAINS", "ß")
sys_documentation.query();
if (sys_documentation.hasNext()) {
    var counter3 = 0;
    while (sys_documentation.next()) {
        var old_label = sys_documentation.label;
        var old_plural = sys_documentation.plural;
        if ((old_label.indexOf('ß') > -1) || (old_label.indexOf('ß') > -1)) { //additional check is needed, since GlideRecord query does not uniquely recognize ß character
            var new_label = old_label.replaceAll("ß", "ss");
            var new_plural = old_plural.replaceAll("ß", "ss");
            sys_documentation.label.setDisplayValue(new_label);
            sys_documentation.plural.setDisplayValue(new_plural);
            sys_documentation.update();
            counter3++;
			gs.log(new_value);
			gs.log(new_plural);
        }
    }
    gs.log("in table sys_documentation " + counter3 + " records were updated");
}

//edit all labels in sys_choice table
var sys_choice = new GlideRecord("sys_choice");
sys_choice.addQuery("language", "de");
sys_choice.addQuery("label", "CONTAINS", "ß");
sys_choice.query();
if (sys_choice.hasNext()) {
    var counter4 = 0;
    while (sys_choice.next()) {
        var old_label = sys_choice.label;
        if (old_label.indexOf('ß') > -1) { //additional check is needed, since GlideRecord query does not uniquely recognize ß character
            var new_label = old_label.replaceAll("ß", "ss");
            sys_choice.label.setDisplayValue(new_label);
            sys_choice.update();
            counter4++;
        }
    }
    gs.log("in table sys_choice " + counter4 + " records were updated");
}

//edit all values in sys_translated_text table
var sys_translated_text = new GlideRecord("sys_translated_text");
sys_translated_text.addQuery("language", "de");
sys_translated_text.addQuery("value", "CONTAINS", "ß");
sys_translated_text.query();
if (sys_translated_text.hasNext()) {
    var counter5 = 0;
    while (sys_translated_text.next()) { //additional check is needed, since GlideRecord query does not uniquely recognize ß character
        var old_value = sys_translated_text.value;
        if (old_value.indexOf('ß') > -1) {
            var new_value = old_value.replaceAll("ß", "ss");
            sys_translated_text.value.setDisplayValue(new_value);
            sys_translated_text.update();
            counter5++;
        }
    }
    gs.log("in table sys_translated_text " + counter5 + " records were updated");
}
