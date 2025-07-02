    //Fix script to automatically assign a list of users to a specific group

    //Sys_id value of the selected group to be assigned to users (in this example it is the 'help desk' group)
    var GROUP_ID = '679434f053231300e321ddeeff7b12d8';

    //Array to store a list of all updated users for logging purposes
    var updatedUserList = [];

    //Query to get the list of all users getting the new group
    var grUserList = new GlideRecord('sys_user');
    grUserList.addQuery('department', '5d7f17f03710200044e0bfc8bcbe5d43'); //Customer support department 
    grUserList.addActiveQuery();
    grUserList.query();

    while (grUserList.next()) {

        //Assigning group to user
        var grGroup = new GlideRecord('sys_user_grmember');
        grGroup.initialize();
        grGroup.user = grUserList.sys_id;
        grGroup.group = GROUP_ID;
        grGroup.insert();

        //Pushing user sys_id to array
        updatedUserList.push(grUserList.sys_id.toString());
    }

    //Logging details of Fix Script execution
    gs.info('[Fix Script] - Assigned group: ' + GROUP_ID + ' to ' + grUserList.getRowCount() + ' users.');
    gs.info('[Fix Script] - Users list: ' + updatedUserList.join(', '));
