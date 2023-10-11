function getMyDirectReports(managerID) {
    //if no User sys_id is passed in, assume we need the direct reports for the logged on user.
    if (typeof managerID == "undefined") {
        managerID = gs.getUserID();
    }

    //unique method is used to ensure no duplicates
    var myPeople = []; //array for direct reports sys_ids

    var userGr = new GlideRecord("sys_user");
    userGr.addQuery("manager", managerID);
    userGr.addQuery("sys_id", "!=", managerID); //recursion protection, exclude the manager
    userGr.addQuery("active", true); //only active employees
    userGr.query();
    if (!userGr.next()) {
        //return early if no direct reports
        return myPeople;
    }
    while (userGr.next()) {
        myPeople.push(userGr.getUniqueValue());
    }
    
    // remove duplicates
    var arrayUtil = new ArrayUtil();
    arrayUtil.unique(myPeople);
    
    return myPeople;
}

function getMyReports(managerID) {
    //if no User sys_id is passed in, assume we need the direct reports for the logged on user.
    if (typeof managerID == "undefined") {
        managerID = gs.getUserID();
    }

    var arrayUtil = new ArrayUtil(); //unique method is used to ensure no duplicates
    var myReports = []; //array for direct reports sys_ids

    getReportsRecursive(managerID, myReports);

    arrayUtil.unique(myReports);
    return myReports;
}

function getReportsRecursive(managerID, myReports) {
    var arrayUtil = new ArrayUtil();

    var userGr = new GlideRecord("sys_user");
    userGr.addQuery("manager", managerID);
    userGr.addQuery("sys_id", "!=", managerID); //recursion protection 1, exclude the manager
    userGr.addQuery("active", true); //only active employees
    userGr.query();
    while (userGr.next()) {
        var userID = userGr.getUniqueValue();
        //recursion protection 2, only proceed with a new search if this user isn't already in the array.
        if (!arrayUtil.contains(myReports, userID)) {
            myReports.push(userID);
            //keep following the org hierarchy until we don't find any more reports
            getReportsRecursive(userID, myReports);
        }
    }
}
