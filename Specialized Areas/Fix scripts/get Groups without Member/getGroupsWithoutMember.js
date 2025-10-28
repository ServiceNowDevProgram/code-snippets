gs.info('Below groups have no memebers');
var groupArr = [];
var groupGr = new GlideRecord('sys_user_group');
groupGr.addActiveQuery();
groupGr.query();
while(groupGr.next()){
	var grMem = new GlideRecord('sys_user_grmember');
	grMem.addQuery('group',groupGr.getUniqueValue());
	grMem.addQuery('user.active',true);
	grMem.query();
	if(!grMem.hasNext()){
		groupArr.push(groupGr.getUniqueValue());
		gs.info('Name: '+groupGr.getValue('name')+' , Sys ID: '+groupGr.getUniqueValue())
	}
}
gs.info('Group SysID: '+groupArr.toString());
