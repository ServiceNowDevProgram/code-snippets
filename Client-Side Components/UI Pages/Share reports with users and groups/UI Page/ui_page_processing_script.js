if (cancelled == "false") {
    var dashboard_id = key; // sys id of the dashboard from the Jelly script
    var group_id = group; // sys id of group from the Jelly script
    var user_id = user; //sys id of user from the Jelly script

    if (!gs.nil(group_id) || !gs.nil(user_id)) {
        groupShare(dashboard_id, group_id);
        userShare(dashboard_id, user_id);
        response.sendRedirect("pa_dashboards.do?sys_id=" + key);
    } else {
        response.sendRedirect("pa_dashboards.do?sys_id=" + key);
        gs.addErrorMessage("Please select group/user");
    }
} else {
    response.sendRedirect("pa_dashboards.do?sys_id=" + key);
}

function groupShare(dashboard_id, group_id) {
    var db_view = new GlideRecord('u_reports_shared_with_dashboard'); // Database view name
    db_view.addEncodedQuery('repstat_report_sys_id!=^dt_dashboard=' + dashboard_id);
    db_view.query();
    while (db_view.next()) {
        var report_id = db_view.rep_sys_id;

        var rec = new GlideRecord("sys_report");
        rec.get(report_id);
        rec.user = "group";
        rec.update();

        var report_sharing = new GlideRecord('sys_report_users_groups');
        report_sharing.addQuery('group_id', group_id);

        report_sharing.addQuery('report_id', report_id);
        report_sharing.query();
        if (!report_sharing.next()) {
            var new_record = new GlideRecord('sys_report_users_groups');
            new_record.initialize();
            new_record.report_id = report_id;
            new_record.group_id = group_id;
            new_record.insert();
        }

    }
}

function userShare(dashboard_id, user_id) {
    var db_view = new GlideRecord('u_reports_shared_with_dashboard');
    db_view.addEncodedQuery('repstat_report_sys_id!=^dt_dashboard=' + dashboard_id);
    db_view.query();
    while (db_view.next()) {
        var report_id = db_view.rep_sys_id;

        var rec = new GlideRecord("sys_report");
        rec.get(report_id);
        rec.user = "group";
        rec.update();

        var report_sharing = new GlideRecord('sys_report_users_groups');
        report_sharing.addQuery('user_id', user_id);
        report_sharing.addQuery('report_id', report_id);
        report_sharing.query();
        if (!report_sharing.next()) {
            var new_record = new GlideRecord('sys_report_users_groups');
            new_record.initialize();
            new_record.report_id = report_id;
            new_record.user_id = user_id;
            new_record.insert();
        }

    }
}
