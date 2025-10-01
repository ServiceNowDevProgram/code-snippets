var BackfillAssignmentGroup = Class.create();
BackfillAssignmentGroup.prototype = {
  initialize: function () {},

  BackfillAssignmentGroup: function () {
    var groups = " ";
    var assignee = current.assigned_to;

    //return all relevant groups (active, itil) if the assigned_to value is empty

    if (!assignee) {
      var allGrp = new GlideRecord("sys_user_group");
      allGrp.addActiveQuery();
      allGrp.addEncodedQuery("typeLIKE1cb8ab9bff500200158bffffffffff62"); //group is constrained to 'itil' type. You can change this to meet your requirements
      allGrp.query();
      while (allGrp.next()) {
        //build a comma separated string of groups if there is more than one
        if (groups.length > 0) {
          groups += "," + rgrp.sys_id;
        } else {
          groups = rgrp.sys_id;
        }
      }
      return "sys_idIN" + groups;
    }
    //sys_user_grmember has the user to group relationship
    var userGrp = new GlideRecord("sys_user_grmember");
    userGrp.addQuery("user", assignee);
    userGrp.addEncodedQuery("group.typeLIKE1cb8ab9bff500200158bffffffffff62"); //group is constrained to 'itil' type. You can change this to meet your requirements
    userGrp.query();
    while (userGrp.next()) {
      if (groups.length > 0) {
        //build a comma separated string of groups if there is more than one
        groups += "," + userGrp.group;
      } else {
        groups = userGrp.group;
      }
    }
    // return Groups where assigned to is in those groups we use IN for lists
    return "sys_idIN" + groups;
  },
  type: "BackfillAssignmentGroup",
};
