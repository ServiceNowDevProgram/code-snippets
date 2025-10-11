function getUserGroupMembers(userSysID) {

  var ourUser = userSysID || gs.getUserID(),
    usrdetails = {};
  usrdetails.grps = [],
    usrdetails.sharedUsrs = {};

  var grmemberGRPS = new GlideRecord('sys_user_grmember');
  grmemberGRPS.addQuery('user', ourUser)
  grmemberGRPS.query();
  while (grmemberGRPS.next()) {

    var user = grmemberGRPS.user.getRefRecord();
    usrdetails.user = user.getValue('name');

    var grp = grmemberGRPS.group.getRefRecord();
    usrdetails.grps.push(grp.getValue('name'));

    usrdetails['sharedUsrs'][grp.getValue('name')] = [];

    var grmemberUSRS = new GlideRecord('sys_user_grmember');
    grmemberUSRS.addQuery('group', grp.getValue('sys_id'));
    grmemberUSRS.addQuery('user', '!=', ourUser);
    grmemberUSRS.query();
    while (grmemberUSRS.next()) {
      var usr = grmemberUSRS.user.getRefRecord();
      usrdetails['sharedUsrs'][grp.getValue('name')].push(usr.getValue('name'));
    }

  }

  var result = "\nUSER '" + usrdetails.user + "' BELONGS TO FOLLOWING GROUPS: " + usrdetails.grps.sort().join(', ') + '\n\n';

  for (var i in usrdetails.sharedUsrs) {
    result += ('Group "' + i + '" shared members : ' + usrdetails['sharedUsrs'][i].sort().join(', ') + '\n\n');
  }

  return result;
}

// added Abel to 2 HR groups and then printing the names of members who belong to those groups.
gs.info(getUserGroupMembers('62826bf03710200044e0bfc8bcbe5df1')); //Abel Tuter sys_id


