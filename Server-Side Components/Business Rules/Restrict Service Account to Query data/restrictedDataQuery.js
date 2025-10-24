(function executeRule(current, previous /*null when async*/ ) {

    // Calling the property which contains the sysId of restricted user account
    var restrictedUserSysId = gs.getProperty('restricted.service.account.id'); //Propery 'restricted.service.account.id' is having the userId of Service Account

    // Checking if the user who is querying is same as the restricted user
    if (gs.getUserID() === restrictedUserSysId) {
		
        // Calculating date 10 years ago from current/today date
        var tenYearsAgoFromToday = new GlideDateTime();
        tenYearsAgoFromToday.addYears(-10);

        //Limit records to the last 10 years
        current.addQuery('sys_created_on', '>=', tenYearsAgoFromToday);
    }

})(current, previous);
