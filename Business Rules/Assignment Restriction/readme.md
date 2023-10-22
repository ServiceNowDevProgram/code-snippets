Before Update business rule to restrict the assignment from groups that are not allowed.

  //SysID of groups - Group Name
	//477a05d153013010b846ddeeff7b1225 - App Engine Admins
	//0a52d3dcd7011200f2d224837e6103f2 - Application Development
	//aaccc971c0a8001500fe1ff4302de101 - Capacity Mgmt

 Navigate to the business rule in the application navigator and then create a new business rule on the required table.
 Click the advance checkbox
 when to run: before update
 Filter condition: assignment group changes
 paste the code in the advance section of this business rule. save it.
 


Use Case: In this particular case, we have restricted assignment for the group 'Application Development' 
from all the other groups except 'App Engine Admins' and 'Capacity Mgmt'. So, only these 2 groups can 
assign tickets to the 'Application Development' group.
