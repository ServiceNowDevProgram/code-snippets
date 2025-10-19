(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var groupName = request.queryParams.groupName;
    var members = [];
    if (!groupName) {
        response.setStatus(400);
        return {
            error: "groupName query parameter is required"
        };
    }
    var grGrp = new GlideRecord('sys_user_group');
    grGrp.addQuery('name', groupName);
    grGrp.query();
    if (!grGrp.next()) {
        response.setStatus(400);
        return {
            error: "Group name doesn't found"
        };
    }
    var grGrpMem = new GlideRecord('sys_user_grmember');
    grGrpMem.addQuery("group.name", groupName);
    grGrpMem.query();
    while (grGrpMem.next()) {
        members.push({
            userName: grGrpMem.user.user_name.toString(),
            displayName: grGrpMem.user.name.toString(),
            email: grGrpMem.user.email.toString(),
			active: grGrpMem.user.active.toString()
        });
    }
    return {
        groupName: groupName.toString(),
        totalMembers: members.length,
        member: members
    };



})(request, response);
