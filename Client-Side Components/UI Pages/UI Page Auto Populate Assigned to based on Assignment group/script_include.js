var getGroupUserIDUtil = Class.create();
getGroupUserIDUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getUserId: function(){
		var userIDArr = [];
		var getGroup = this.getParameter('sysparm_group');
		var getUser = new GlideRecord('sys_user_grmember');
		getUser.addEncodedQuery('group='+getGroup);
		getUser.query();
		while(getUser.next()){
			userIDArr.push(getUser.getValue('user'));
		}
		return userIDArr.join(',');
	},
    type: 'getGroupUserIDUtil'
});
