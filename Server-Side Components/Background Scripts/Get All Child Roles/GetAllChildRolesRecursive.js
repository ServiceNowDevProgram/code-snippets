// You can set this to a role name or the Sys ID of the "sys_user_role" record
var roleNameOrSysId = "itil";
var result = getFullRoleHierarchyList(roleNameOrSysId);

// This is just to print out the results. Remove this when you want to use it
for (var i = 0; i < result.length; i++) {
	gs.info(result[i]);
}

function getFullRoleHierarchyList(roleNameOrSysID) {

	var roleSysID = "";
	var grRole = new GlideRecord("sys_user_role");
	grRole.addEncodedQuery("name=" + roleNameOrSysID + "^ORsys_id=" + roleNameOrSysID);
	grRole.query();
	while(grRole.next()) {
		roleSysID = grRole.getUniqueValue();
	}

	if (!roleSysID) {
		gs.warn("Role entered does not exist.")
		return;
	}

	var obj = getChildRoles({}, roleSysID, "", "role", "contains");
	var arr = [];
	for (var key in obj) {
		arr.push(obj[key].display);
	}
	return arr;
}

function getChildRoles(found, queryId, display, queryField, getField) {
	if (!queryId || found.hasOwnProperty(queryId))
		return;

	if (display) {
		found[queryId] = {display: display};
		direct = false;
	}
	var gr = new GlideRecord("sys_user_role_contains");
	gr.addEncodedQuery(queryField + "=" + queryId);
	gr.query();
	while(gr.next()) {
		getChildRoles(found, gr.getValue(getField), gr.getDisplayValue(getField), queryField, getField);
	}

	return found;
}
