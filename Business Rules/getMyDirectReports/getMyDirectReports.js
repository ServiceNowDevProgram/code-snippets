function getMyDirectReports(mgrID) {
    var au = new ArrayUtil();

    if (typeof mgrID == "undefined") {
        mgrID = gs.getUserID();
    }
    var myPeople = [];

    var u = new GlideRecord("sys_user");
    u.addQuery("manager", mgrID);
    u.addQuery("sys_id", "!=", mgrID);
    u.addQuery("active", true);
    u.query();
    while (u.next()) {
        if (!au.contains(myPeople, u.sys_id)) {
            myPeople.push(u.sys_id + "");
        }
    }

    return myPeople;
}

function getMyReports(mgrID) {
    var au = new ArrayUtil();

    if (typeof mgrID == "undefined") {
        mgrID = gs.getUserID();
    }
    var myReports = [];
    getReportsRecursive(mgrID, myReports);

    au.unique(myReports);
    return myReports;
}

function getReportsRecursive(mgrID, myReports) {
    var au = new ArrayUtil();

    var u = new GlideRecord("sys_user");
    u.addQuery("manager", mgrID);
    u.addQuery("sys_id", "!=", mgrID);
    u.addQuery("active", true);
    u.query();
    while (u.next()) {
        if (!au.contains(myReports, u.sys_id)) {
            myReports.push(u.sys_id + "");
            getReportsRecursive(u.sys_id, myReports);
        }
    }
}
