var jsonFavList = {
  "SLA for My Group Tasks": "task_list.do?sysparm_query=assignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744&sysparm_first_row=1&sysparm_view=",
  "SLA for My Tasks": "task_list.do?sysparm_query=assigned_toDYNAMIC90d1921e5f510100a9ad2572f2b477fe&sysparm_first_row=1&sysparm_view=",
  "Tasks Assigned to Me": "task_list.do?sysparm_query=stateNOT INclosed_complete,closed_abandoned^assigned_toDYNAMIC90d1921e5f510100a9ad2572f2b477fe",
  "My approvals": "sysapproval_approver_list.do?sysparm_query=approverDYNAMIC90d1921e5f510100a9ad2572f2b477fe&sysparm_first_row=1&sysparm_view="
};

var g = new GlideRecord("sys_user_has_role");
g.addEncodedQuery("role=282bf1fac6112285017366cb5f867469");//considering sys_id for ITIL role is 282bf1fac6112285017366cb5f867469
g.query();
while (g.next()) {
	for (var fav in jsonFavList) {
		var grBookMark = new GlideRecord("sys_ui_bookmark");
		grBookMark.addEncodedQuery("user=" + g.user + "^title=" + fav + "^url=" + jsonFavList[fav]);
		grBookMark.query();
		if (!grBookMark.next()) {
			grBookMark.initialize();
			grBookMark.pinned = true;
			grBookMark.title = fav;
			grBookMark.url = jsonFavList[fav];
			grBookMark.user = g.user;
			grBookMark.insert();
		}
	}
}
