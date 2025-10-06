(function executeRule(current, previous /*null when async*/ ) {

    var usr = gs.getUserID();
    
    var userDept = (gs.getUser().getRecord().getValue('department'));//check for logged in user department
    if (userDept != 'XYZ') { //is not XYZ. replace XYZ with relevant sys_id
        current.addQuery('name', '!=', 'Private Task'); //This will remove Private Task from interceptor for all users with department other than XYZ
    }

})(current, previous);
