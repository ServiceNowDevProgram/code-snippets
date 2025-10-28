(function executeRule(current, previous /*null when async*/ ) {

    // Copies the values from a multi-row variable set into a variable so we can view the values on a catalog task.
    var variables = [];
    var catItem = current.request_item.cat_item.toString();
    var variableSets = [];
    var getVariableSets = new GlideRecord('io_set_item');
    getVariableSets.addQuery('sc_cat_item', catItem);
    getVariableSets.query();
    while (getVariableSets.next()) {
        variableSets.push(getVariableSets.getValue('variable_set'));
    }
    var getCatalogVariables = new GlideRecord('item_option_new');
    var qry = 'cat_item=' + catItem +
        '^active=true' +
        '^NQvariable_set.sys_idIN' + variableSets.toString() +
        '^active=true';
    getCatalogVariables.addQuery(qry);
    getCatalogVariables.query();
    while (getCatalogVariables.next()) {
        variables.push(getCatalogVariables.getValue('sys_id'));
    }
    var variablesCount = variables.length;
    var currentTaskID = current.sys_id.toString();
    for (var i = 0; i < variablesCount; i++) {
        var getTaskVars = new GlideRecord('sc_item_variables_task');
        getTaskVars.addQuery('task', currentTaskID);
        getTaskVars.addQuery('variable', variables[i]);
        getTaskVars.setLimit(1);
        getTaskVars.query();
        if (!getTaskVars.hasNext()) {
            getTaskVars.initialize();
            getTaskVars.setValue('task', currentTaskID);
            getTaskVars.setValue('variable', variables[i]);
            getTaskVars.insert();
        }
    }
})(current, previous);
