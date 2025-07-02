var GetGroupMembers = Class.create();
GetGroupMembers.prototype = {
    initialize: function() {},
    
    getGroupMember: function(groupId) {
        var id = [];
        var grGroupMember = new GlideRecord('sys_user_grmember');

        grGroupMember.addQuery("group.sys_id", groupId);
        grGroupMember.query();

        while (grGroupMember.next()) {
            id.push(grGroupMember.getValue("user"));
        }

        return id.join();
    },

    type: 'GetGroupMembers'
};