//Auto-assignment based on application variable selection in catalog
///*
//==============================================================================
// Script: Auto Assignment by Application Group
// Table: sc_req_item | When: Before Insert/Update

// PREREQUISITES ✅
// ------------------------------------------------------------------------------
// 1️⃣ Catalog Variable must exist:
//     - Name: dummy_app_group (Select Box)
//     - Values: AppGroup A/B/C etc.

// 2️⃣ Assignment Group sys_ids mapping must be updated with real values in PROD.

// 3️⃣ Variable stored in sc_item_option_mtom for sync:
 //    - Name: dummy_group_variable (Reference: sys_user_group)

// 4️⃣ Assignment Group field must be present on RITM form.

// Summary: Auto-assign Assignment Group based on selected Application Group + 
 //update associated variable for data consistency.
//==============================================================================
//*/

(function executeRule(current, previous /*null when async*/) {
    // Retrieve the application group variable
    var appGroupVar = current.variables.dummy_app_group;
    var groupSysId = ''; // This will store the dummy sys_id

    // Ensure the variable exists before proceeding
    if (appGroupVar) {
        var appGroupValue = appGroupVar.getDisplayValue(); // Get the display value of the variable

        // Match group values and assign dummy group sys_ids
        if (appGroupValue === 'AppGroup A') {
            groupSysId = '11111111111111111111111111111111';
        } else if (appGroupValue === 'AppGroup B') {
            groupSysId = '22222222222222222222222222222222';
        } else if (appGroupValue === 'AppGroup C') {
            groupSysId = '33333333333333333333333333333333';
        } 

        // Update Assignment Group in the RITM
        if (groupSysId) {
            current.assignment_group = groupSysId; // Set dummy sys_id in Assignment Group
            gs.addInfoMessage('Assignment Group updated to sys_id: ' + groupSysId);

            // Update the group variable on sc_item_option_mtom table
            var grVars = new GlideRecord('sc_item_option_mtom');
            grVars.addQuery('request_item', current.sys_id);
            grVars.addQuery('sc_item_option.item_option_new.name', 'dummy_group_variable');
            grVars.query();
            if (grVars.next()) {
                grVars.value = groupSysId;
                grVars.update();
                gs.addInfoMessage('Group variable updated to sys_id: ' + groupSysId);
            } else {
                gs.addErrorMessage('Group variable not found for the RITM.');
            }
        } else {
            gs.addErrorMessage('No valid Assignment Group found for: ' + appGroupValue);
        }
    } else {
        gs.addErrorMessage('Application group variable is not set.');
    }
})(current, previous);
