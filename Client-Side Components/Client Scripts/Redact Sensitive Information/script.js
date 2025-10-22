function onSubmit() {
    var redact = g_form.getValue("u_redact"); //custom field on the form to redact information
    if (redact == true) {
        var answer = confirm(getMessage('Do you want to redact sensitive information')); //Confirm the user who wants to redact information 
        if (answer) {
            g_form.setValue('short_description', 'Short Description is redacted as it contained sensitive information'); //Custom short_description post redacting
            g_form.setValue('description', 'Description is redacted as it contained sensitive information'); //Custom description post redacting
            g_form.setValue('work_notes', 'The Description and Short Description has been redacted.'); //Adding work notes to track who redacted the short_description and description
            g_form.setReadOnly('short_description', true);
            g_form.setReadOnly('description', true);
            g_form.setReadOnly('u_redact', true)
        } else {
            g_form.setValue('u_redact', false);
            return false;
        }
    }
}
