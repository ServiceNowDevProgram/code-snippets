//Table: Change Request.
//Condition: Assignment Group changes AND Assigned To is not empty
//When to run: After Update
(function executeRule(current, previous /*null when async*/ ) {
    var groupSysId = 'b85d44954a3623120004689b2d5dd60a'; //sys_id of a current assignment group
    var array = [];
    // Fetch active users in the group
    var membersGR = new GlideRecord('sys_user_grmember');
    membersGR.addQuery('group', groupSysId);
    membersGR.addQuery('user.active', true);
    membersGR.query();
    var userList = [];
    while (membersGR.next()) {
        userList.push(membersGR.user.toString());
    }
    // Round-robin tracking via sys_properties
    var propName = 'round_robin.lastUser.' + groupSysId; // Name of the system property that stores the Assigned To value
    var lastUser = gs.getProperty(propName, ''); // Value of the system property that stores the previous Assigned To value
    var nextUserIndex = 0;
    if (lastUser) {
        var lastIndex = userList.indexOf(lastUser);
        nextUserIndex = (lastIndex + 1) % userList.length;
    }
    var nextUser = userList[nextUserIndex];
    gs.setProperty(propName, nextUser); //Setting the new value for the system property.
    current.assigned_to = nextUser;
    current.update();

})(current, previous);
