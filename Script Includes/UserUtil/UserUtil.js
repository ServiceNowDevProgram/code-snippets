var userUtil = Class.create();
userUtil.prototype = {
  initialize: function () { },

  //main use of this was to filter a list of assets assigned to the members of a specific group.

  //On a list, in the condition builder, choose the user field you'd like to filter based on the assignee's group membership.

  //Ex: javascript: new userUtil().userMemberOf("Service Desk") in the assigned_to field

  userMemberOf: function (group_name) {
    var members = new GlideRecord("sys_user_grmember");
    members.addQuery("group.name", group_name);
    members.query();
    var member_list = [];
    while (members.next()) {
      member_list.push(members.user.sys_id.toString());
    }
    return member_list;
  },

  isManager: function (userID) {
    //checks if the user has direct reports. Useful in workflow or if you don't have a group to check against or need
    //typically pass in logged-in user's sys_id
    //var userObj = gs.getUserID();

    var managerLookup = new GlideRecord("sys_user");
    managerLookup.addActiveQuery();
    managerLookup.addQuery("manager", userObj);
    managerLookup.query();

    if (managerLookup.next()) {
      //gs.info("True - user has direct reports");
      return true;
    } else {
      //gs.info("False - user not have direct reports");
      return false;
    }
  },

  //list assets belonging to the user. Can be used to retrieve a user's current assets in a workflow for fulfilment activity
  getUserAssets: function (user) {
    var assets = new GlideRecord("alm_hardware");
    assets.addQuery("install_status", 1);
    assets.addQuery("assigned_to", user);
    assets.query();

    var list = [];
    while (assets.next()) {
      list.push(assets.sys_id.toString());
    }

    return list;
  },

  getCompanyUsers: function (companyId, roleName) {

    var userGR = new GlideRecord('sys_user');
    userGR.addQuery('company', companyId);
    userGR.addQuery('roles', 'snc_external');
    userGR.addQuery('roles', roleName);
    userGR.query();
    var users = [];
    while (userGR.next()) {
      var user = {};
      user.email = userGR.email.toString();
      user.firstName = userGR.first_name.toString();
      user.lastName = userGR.last_name.toString();
      user.roleName = roleName;
      users.push(user);
    }

    return users;
  },

  emailValidation: function () {
    //sysparam_catalog_req_email
    var catalogReqEmail = this.getParameter('sysparam_email');
    var userGR = new GlideRecord('sys_user');
    userGR.addQuery('email', catalogReqEmail);
    userGR.queryNoDomain();

    var user = {};

    if (userGR.next()) {
      user.email = userGR.email.toString();
      user.firstName = userGR.first_name.toString();
      user.lastName = userGR.last_name.toString();
    }

    gs.log("Users - " + JSON.stringify(user));
    return JSON.stringify(user);
  },

  type: "userUtil",
};