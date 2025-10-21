function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    // Define parameters dynamically
    var tableName = 'sys_user'; // Change as needed
    var keyField = 'sys_id'; // Change as needed
    var fieldsToFetch = 'email'; // Comma-separated list
    var targetField = 'user'; // Field to populate

    var ga = new GlideAjax('DynamicTableQueryUtil');
    ga.addParam('sysparm_name', 'getTableRow');
    ga.addParam('sysparm_table_name', tableName);
    ga.addParam('sysparm_key_field', keyField);
    ga.addParam('sysparm_key_value', newValue);
    ga.addParam('sysparm_fields', fieldsToFetch);
    ga.getXML(function(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        if (!answer) {
            alert('No response from Script Include');
            return;
        }

        var parsedAnswer = JSON.parse(answer);
        if (parsedAnswer[fieldsToFetch]) {
            g_form.setValue(targetField, parsedAnswer[fieldsToFetch]['fieldVal']);
        } else {
            alert('error');
        }
    });
}
