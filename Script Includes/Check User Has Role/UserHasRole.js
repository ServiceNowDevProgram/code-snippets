var UserHasRole = Class.create();
UserHasRole.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    isPublic: function() {
        return true;
    },

    userHasRole: function(userId, roleId) {
        try {
			
			userId = (userId == '' || userId == undefined) ? gs.getUserID() : userId; 

            var grUserHasRole = new GlideRecord('sys_user_has_role');
            grUserHasRole.addQuery('role', roleId);
            grUserHasRole.addQuery('user', userId);
            grUserHasRole.setLimit(1);
            grUserHasRole.query();
			
            return sysUserHasRole.hasNext();

        } catch (exception) {
            gs.info('UserHasRole.userHasRole() - ' + exception);
        }
    },

    type: 'UserHasRole'
});