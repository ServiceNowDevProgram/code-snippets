(function executeRule(current, previous /*null when async*/ ) {
    //Script to automatically assgin a specific role on creation or update of users

    //Sys_id value of the selected role which is to be granted for the user (in this example it is the 'knowledge' role)
    var ROLE_ID = '1f26da36c0a8016b000c7f06a1ce7e14';

    //Query to find out the specific role asgined to current user
    var grRole = new GlideRecord('sys_user_has_role');
    grRole.addQuery('user', current.sys_id);
    grRole.addQuery('role', ROLE_ID);
    grRole.query();

    //Verify if the role already exists, to prevent role duplicates
    if (!grRole.hasNext()) {

        //Initialize and insert new role for current user
        grRole.initialize();
        grRole.user = current.sys_id;
        grRole.role = ROLE_ID;
        grRole.insert();
    }

})(current, previous);
