(function executeRule(current, previous /*null when async*/) {
    
    var updateSetName = current.name.toString().trim();
    var grUpdateSet = new GlideRecord('sys_update_set');
    grUpdateSet.addQuery('name', updateSetName);
    grUpdateSet.addQuery('sys_id', '!=', current.sys_id);
    grUpdateSet.query();
    
    if (grUpdateSet.hasNext()) {
        gs.addErrorMessage('An update set with this name already exists. Please choose a different name.');
        current.setAbortAction(true);
    }
    
})(current, previous);
