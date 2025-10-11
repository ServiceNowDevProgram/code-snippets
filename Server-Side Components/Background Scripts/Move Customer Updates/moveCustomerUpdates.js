//A background script to move customer updates from source update set to target update set within the same application scope.
function moveCustomerUpdates(sourceUpdateSetSysId, targetUpdateSetSysId) {
    var customerUpdateGR = new GlideRecord('sys_update_xml');
    customerUpdateGR.addQuery('update_set', sourceUpdateSetSysId);
    customerUpdateGR.setValue('update_set', targetUpdateSetSysId);
    customerUpdateGR.updateMultiple();
}

moveCustomerUpdates('sourceUpdateSetSysId', 'targetUpdateSetSysId');
