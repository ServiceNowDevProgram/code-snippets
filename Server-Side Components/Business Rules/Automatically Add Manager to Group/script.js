(function executeRule(current, previous /*null when async*/ ) {
    /*
    Insert : When Group is created, manager is added to group.
    Update : When group manager is changed, it is added to group.
    */
    var checkManager = new GlideRecord('sys_user_grmember'); // membership table glide record.
    checkManager.addEncodedQuery('user=' + current.getValue('manager') + 'group=' + current.getUniqueValue()); // encoded query to check current membership.
    checkManager.query();
    if (!checkManager.hasNext()) { // if current manager is not added to group.
        //Add Manager to group.
        checkManager.user = current.getValue('manager');
        checkManager.group = current.getUniqueValue();
        checkManager.insert();
    }

})(current, previous);
