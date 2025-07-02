/*
    Find all the update-sets that are WIP and the customer updates contains more than one applications
*/

//-------------------------------------------------------------------------------------------------------------
// If we want specific users e.g. if there are multiple partners and we want only our techs then add them to
// the list below else clear the list!
//-------------------------------------------------------------------------------------------------------------
var createdByUsers = [
    // TODO: Add your specific user user_name based on sys_user table
    ];
    
    //-------------------------------------------------------------------------------------------------------------
    // Go though all the Update-sets that are WIP or alternatively add the filter to grab for specific users
    // Ignore the Default update-sets
    //-------------------------------------------------------------------------------------------------------------
    var grSysUpdateSet = new GlideRecord('sys_update_set');
    grSysUpdateSet.addQuery('state', 'in progress');
    grSysUpdateSet.addQuery('name', '!=', 'Default');
    
    //-------------------------------------------------------------------------------------------------------------
    // If users list exist then add it to the query
    //-------------------------------------------------------------------------------------------------------------
    if(createdByUsers && createdByUsers.length > 0){
        var createdByUsersQuery = createdByUsers.join(',').trim(',');
        grSysUpdateSet.addQuery('sys_created_by', 'IN', createdByUsersQuery);
    }
    
    grSysUpdateSet.query();
    
    // Distinct Update-set names
    var distinctXMLList = [];
    
    while (grSysUpdateSet.next()) {
    
        //-------------------------------------------------------------------------------------------------------------
        // Find all the customer updates belongs to this update-set and are different than the update-set application
        //-------------------------------------------------------------------------------------------------------------
        var grCustomerUpdates = new GlideRecord('sys_update_xml');
        grCustomerUpdates.addQuery("update_set.sys_id", grSysUpdateSet.getUniqueValue());
        grCustomerUpdates.addQuery("application", '!=', grSysUpdateSet.getValue('application'));
        grCustomerUpdates.query();
    
    
        while (grCustomerUpdates.next()) {
            
            // Don't report the same update-set name more than once, as long as it is reported once is enough!!
            if(distinctXMLList.indexOf(grSysUpdateSet.getValue('name')) == -1){
                gs.debug('-------------------------------------------------------------------------------------------------------------');
                gs.debug('Found an update-set that its customer updates has more than one applications (at least)!');
                gs.debug('-------------------------------------------------------------------------------------------------------------');
                gs.debug('Update-set name (sys_update_set): ' + grSysUpdateSet.getValue('name'));
                gs.debug('Update-set application: ' + grSysUpdateSet.getDisplayValue('application'));
                gs.debug('Customer updates application (sys_update_xml.application): ' + grCustomerUpdates.getDisplayValue('application'));
                gs.debug('-------------------------------------------------------------------------------------------------------------');
            
                distinctXMLList.push(grSysUpdateSet.getValue('name'));
            }
        }
        
    }