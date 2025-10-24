/*
Create after BR to delete the user role from table. In this example table is referenced as 'Service Category User Role[service Category User Role]'

>>>>When to Run:
When: AFter
Operation:Delete
order: 100

>>>> Condition: 
  !current.user_role.nil()
*/
deleteUserRole();

function deleteUserRole() {
	var ur = new GlideRecord("sys_user_has_role");
	if (ur.get(current.user_role))
		ur.deleteRecord();
}
