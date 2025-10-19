//Recursive function to get the complete manager hierarchy
//Param 1: managerArray an Array to hold manager hierarchy
//Param 2: next is representing next person in the manager hierarchy
function getManagerHierarchy(managerArray, next) {
	var glideRecord = new GlideRecord('sys_user');
	if (glideRecord.get(next)) {//Check if there is a user record
		managerArray.push(glideRecord.manager.name + '');//Add the user detail to the manager array
		return getManagerHierarchy(managerArray, glideRecord.getValue('manager')); //Recursively call the same method to get the details of manager

	} else {//No more manager found return the array to callling function				
		return managerArray.toString().split(',').join(" >> ").substring(0, managerArray.toString().split(',').join(" >> ").length-4);
	}
}

var managerArray = [];
gs.info(getManagerHierarchy(managerArray, '22826bf03710200044e0bfc8bcbe5dec')); //Pass the sys_id of person here
