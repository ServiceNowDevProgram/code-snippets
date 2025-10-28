var SEVEN_DAYS_AGO = new GlideDateTime();

SEVEN_DAYS_AGO.addDaysUTC(-7);
 
//Get group sys_ids from system property

var groupSysIdsStr = gs.getProperty('inactiveuser.groupname');

if (!groupSysIdsStr) {

    


}
 
var GroupSysIds = groupSysIdsStr.split(','); // Split grp sysid with ,
 
//group members in those groups

var groupMemberGR = new GlideRecord('sys_user_grmember');

groupMemberGR.addQuery('group', 'IN', GroupSysIds.join(','));

groupMemberGR.query();
 
while (groupMemberGR.next()) {

    var userID = groupMemberGR.getValue('user');

    if (!userID) continue;
 
    var userGR = new GlideRecord('sys_user');

    if (!userGR.get(userID)) continue;
 
    if (userGR.active) continue;        // Active user skip
 
    var updatedOn = new GlideDateTime(userGR.sys_updated_on);

    if (updatedOn.compareTo(SEVEN_DAYS_AGO) >= 0) {   // User was updated within 7 days, so skip

       // gs.info("Skipping user: " + userGR.name + " - updated on " + userGR.getDisplayValue('sys_updated_on'));

        continue;

    }
 
    var groupName = groupMemberGR.group.getDisplayValue();
 
   
 
    //Unassign Incident record

    var inc = new GlideRecord('incident');

    inc.addQuery('assigned_to', userID);
   

    inc.addQuery('state', '!=', '3');

    inc.query();

    while (inc.next()) {
        

        inc.assigned_to = '';

        inc.update();

       

    }
 
    
 
    // Remove user from group

    gs.info("Removing user: " + userGR.name + " from group: " + groupName);

    groupMemberGR.deleteRecord();

}
