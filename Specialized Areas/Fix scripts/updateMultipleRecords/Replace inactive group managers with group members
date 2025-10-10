/*
Check if manager of group is inactive.
Replace the manager with oldest group member.
*/
function replacewithActiveManager() {
    var inactiveMgrGrp = new GlideRecord('sys_user_group'); // Glide group Table
    inactiveMgrGrp.addEncodedQuery('manager.active=false'); // get groups with inactive managers
    inactiveMgrGrp.query();
    while (inactiveMgrGrp.next()) {
        inactiveMgrGrp.setValue('manager', getOlderGroupMember(inactiveMgrGrp).sys_id); // set inactive manager with active group member.
        inactiveMgrGrp.autoSysFields(false);
        inactiveMgrGrp.update();
        gs.info("Group " + inactiveMgrGrp.name + " manager changed to " + getOlderGroupMember(inactiveMgrGrp).name);
    }

    /*
    input: group, type = string.
    Function return the older group member user record
    */
    function getOlderGroupMember(grp) {
        var getUser = new GlideRecord('sys_user_grmember'); // Glide group member table
        getUser.addEncodedQuery('user.active=true^group=' + grp.getUniqueValue()); // encoded query to get group member.
        getUser.orderByAsc('sys_created_on'); // get oldest added group member
        getUser.query();
        if (getUser.next())
            return getUser.user.getRefRecord();
        else
            gs.info("Group " + grp.name + " does not have any active user"); // incase there is no active user in group
    }
}
replacewithActiveManager(); // main function to replace inactive manager.
