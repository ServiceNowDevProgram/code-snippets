var UserUtils = Class.create();
UserUtils.prototype = {
    initialize: function() {},
  
    getUserName: function(userId) {
        var user = new GlideRecord('sys_user');
        if (user.get(userId)) {
            return user.name;
        }
        return null;
    },
    type: 'UserUtils'
};
