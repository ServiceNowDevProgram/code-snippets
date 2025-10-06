
// Get the Group Sys Id from the Input of Subflow
var group_sys_id = fd_data.subflow_inputs.group_sys_id;


var users = [];
var grGroupMember = new GlideRecord('sys_user_grmember');
grGroupMember.addQuery('group.sys_id', group_sys_id);
grGroupMember.query();
while (grGroupMember.next()) {
	// Get the Primary level manager  from the Subflow Input
    	if (grGroupMember.user.sys_id != fd_data.subflow_inputs.requested_for.manager){
        	users.push(grGroupMember.user.sys_id.toString());
	}
}

return 'ApprovesRejectsAny[' + users + ']';

