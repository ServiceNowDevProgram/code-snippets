function onClick(g_form) {
    var separator = "\n--------------------------------\n";
    var email_body = "Record URL:\n" + g_form.getDisplayValue('number') + separator;
    email_body += "Short Description:\n" + g_form.getValue('short_description') + separator;
    email_body += "Description:\n" + g_form.getValue('description') + separator;

    var email_data = {};
    email_data.REQUESTOR_ID = g_form.getValue('caller_id') || g_form.getValue('opened_by') || g_form.getValue('requested_for');
    email_data.TITLE = g_form.getValue('short_description') || 'ServiceNow Communication';
    email_data.BODY = email_body;
    email_data.REQUEST_ID = g_form.getUniqueValue();
    email_data.TABLE_ID = g_form.getTableName();

    var ga = new GlideAjax('GenericEmailUtility');
    ga.addParam('sysparm_name', 'get_Outlook_link');
    ga.addParam('sysparm_email_body', JSON.stringify(email_data));
    ga.getXMLAnswer(function(response) {
        var mailto_link = response;
        if (mailto_link && mailto_link != 'false') {
            window.open(mailto_link);
        } else {
            g_form.addErrorMessage('Unable to generate Outlook link.');
        }
    });
}
