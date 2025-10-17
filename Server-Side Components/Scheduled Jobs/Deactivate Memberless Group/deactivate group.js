var groupGr = new GlideRecord('sys_user_group');
groupGr.addActiveQuery();
groupGr.query();
while (groupGr.next()) {
    var groupSysId = groupGr.sys_id.toString();
	// Query Group member table
    var memberGr = new GlideRecord('sys_user_grmember');
    memberGr.addQuery('group', groupSysId);
    memberGr.query();
    if (memberGr.hasNext()) {
		// If group has member but date is also populated that means member has joined recently. Clear the field value.
        if (!gs.nil(groupGr.u_memberless_date)) {
            groupGr.u_memberless_date = '';
            groupGr.update();
        }
    } else {
        var today = new GlideDate();
        if (gs.nil(groupGr.u_memberless_date)) {
			// If group doesn't have member populate the fields with today's date if doesn't have a value.
            groupGr.u_memberless_date = today;
            groupGr.update();
        } else {
			// If the field value is present compare the dates and deactivate group accordingly.
            var fieldDate = groupGr.getValue('u_memberless_date');
            today.addMonths(-6);
            if (fieldDate < today) {
                groupGr.active = false;
				groupGr.description = "Group has been deactivated for not having members in last 6 months.";
                groupGr.update();
            }
        }
    }
}
