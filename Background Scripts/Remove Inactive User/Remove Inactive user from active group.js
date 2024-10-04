var user = new GlideRecord("sys_user");
user.addInactiveQuery();  // Filter the InActive user from the sys_user table.
user.query();
while(user.next()){
var group = new GlideRecord("sys_user_group");
group.addQuery("user",user.getUniqueValue());  // Compare the group in which Inactive user would find.
group.query();
if(group.next()){
	// gs.print("Group sys_id is "+ group.getUniqueValue());
	var groupMember= new GlideRecord("sys_user_grmember");
	groupMember.addQuery("group",group.getUniqueValue());  // Compare the group member in which Inactive user would find.
	groupMember.query();
	if(groupMember.next()){
		gs.print("Group sys_id is "+ group.getUniqueValue());  // Get the sys_id of the group;
		gs.print("Member sys_id is "+ groupMember.getUniqueValue());  // Get the sys_id of the member which is inactive.
		gs.print("Deleted record is "+ groupMember.sys_id);  // Get the sys_id of the record which is going to delete;
		groupMember.deleteRecord();  // Delete the record
		
	}
}
}
