/*
Usage: 
  new StarterPackUtils().doubleNumber(<some number>);
  new StarterPackUtils().sayMyName(<user sys_id>);

OR 
  var utils = new StarterPackUtils();
  utils.doubleNumber(<some number>);
  utils.sayMyName(<user sys_id>);

*/


var StarterPackUtils = Class.create();
StarterPackUtils.prototype = {
    initialize: function() {},

    doubleNumber: function(number) {
        var doubleNumber = number * 2;
        return doubleNumber;
    },
    sayMyName: function(userId) {
        var currentUser = gs.getUser().getUserByID(userID);
        return currentUser.getFirstName();
    },
    type: 'StarterPackUtils'
};
