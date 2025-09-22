function changeUpdateSetApplicationScope(updateSetName, currentApplicationScope, newApplicationScope) {

    var newApplicationScopeSysId = getApplicationScopeSysId(newApplicationScope);

    var updateSetGR = new GlideRecord("sys_update_set");
    updateSetGR.addQuery('name', updateSetName);
    updateSetGR.addQuery('application.name', currentApplicationScope);
    updateSetGR.query();

    if (updateSetGR.next()) {
        updateSetGR.setValue('application', newApplicationScopeSysId);
        updateSetGR.update();
    }

}

function getApplicationScopeSysId(scopeName) {
  
    var appGR = new GlideRecord('sys_app');
    appGR.addQuery('name', scopeName);
    appGR.query();
    if (appGR.next()) {
        return appGR.getValue('sys_id');
    }
}

changeUpdateSetApplicationScope('updateSetName', 'currentApplicationScope', 'newApplicationScope');
