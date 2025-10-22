function onAssignmentGroupChange(){
	var assignGroup = gel('assignment_group').value;	
	var ga = new GlideAjax('global.getGroupUserIDUtil');
	ga.addParam('sysparm_name','getUserId');
	ga.addParam('sysparm_group',assignGroup);
	ga.getXML(handleXml);
}

function handleXml(response){
	var userIDArr = response.responseXML.documentElement.getAttribute("answer");
	var userLookUp = gel('lookup.assigned_to');
	userLookUp.setAttribute('onclick',"mousePositionSave(event); reflistOpen( 'assigned_to', 'not', 'sys_user', '', 'false','QUERY:active=false','sys_idIN" + userIDArr+ "', '')");
}
