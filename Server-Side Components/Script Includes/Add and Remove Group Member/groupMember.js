//A script include to add and remove member from a group. We need to pass the sys_id of the group and user to both addMember and removeMember function.
var GroupMember = Class.create();
GroupMember.prototype = {
    initialize: function() {},

    addMember: function(groupSysId, userSysId) {
        var groupMemberGR = new GlideRecord('sys_user_grmember');
        groupMemberGR.initialize();
        groupMemberGR.setValue('group', groupSysId);
        groupMemberGR.setValue('user', userSysId);
        groupMemberGR.insert();
    },

    removeMember: function(groupSysId, userSysId) {
        var groupMemberGR = new GlideRecord('sys_user_grmember');
        groupMemberGR.addQuery('group', groupSysId);
        groupMemberGR.addQuery('user', userSysId);
        groupMemberGR.query();
        if (groupMemberGR.next()) {
            groupMemberGR.deleteRecord();
        }
    },

    type: 'GroupMember'
};
