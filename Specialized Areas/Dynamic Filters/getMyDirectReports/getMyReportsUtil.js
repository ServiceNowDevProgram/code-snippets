var getMyReportsUtil = Class.create();
getMyReportsUtil.prototype = {

    initialize: function() {
        this.myReports = []; //array for direct reports sys_ids
		this.managerID = gs.getUserID(); //set Manager ID to the logged on User
    },

    getMyDirectReports: function() {
        //query the user table for users that report to the specifed Manager
        var userGr = new GlideRecord("sys_user");
        userGr.addQuery("manager", this.managerID);
        userGr.addQuery("sys_id", "!=", this.managerID); //recursion protection, exclude the manager
        userGr.addQuery("active", true); //only active employees
        userGr.query();
        while (userGr.next()) {
			//add the User to the Array
            this.myReports.push(userGr.getUniqueValue());
        }

        return this.myReports;
    },

    getMyReports: function() {
        this._getReportsRecursive();

        return this.myReports;
    },

    _getReportsRecursive: function() {
        //query the user table for users that report to the specifed Manager
        var userGr = new GlideRecord("sys_user");
        userGr.addQuery("manager", this.managerID);
        userGr.addQuery("sys_id", "!=", this.managerID); //recursion protection 1, exclude the manager
        userGr.addQuery("sys_id", "NOT IN", this.myReports); //recursion protection 2, exclude previously found users
        userGr.addQuery("active", true); //only active employees
        userGr.query();
        while (userGr.next()) {
			//add the User to the Array
            this.myReports.push(userGr.getUniqueValue());
            //keep following the org hierarchy until we don't find any more reports
			this.managerID = userGr.getUniqueValue();
            this._getReportsRecursive();
        }
    },



    type: 'getMyReportsUtil'
};
