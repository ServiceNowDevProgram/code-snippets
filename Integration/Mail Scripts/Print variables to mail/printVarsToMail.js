(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    var tableName = current.getDisplayValue('sys_class_name');
    
    template.print("<p></p>" + tableName + ": ");
    
    printVars();

    function printVars() {
        var varSet = new GlideappVariablePoolQuestionSet();
        varSet.setRequestID(current.getValue('sys_id'));
        varSet.load();
        template.print(current.getDisplayValue('cat_item') + "\n");
        template.print("\n");
        var variables = varSet.getFlatQuestions();
        for (var i = 0; i < variables.size(); i++) {
            if (variables.get(i).getLabel() != '') {
                if (variables.get(i).getDisplayValue() != '') {
//                     template.space(6);
                    template.print(variables.get(i).getLabel() + " : " + variables.get(i).getDisplayValue() + "<br/>");
                }
            }
        }
    }

})(current, template, email, email_action, event);
