(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
/* Optional GlideRecord */ event) {

	var requestId = current;
	var portalSuffix = new sn_ex_emp_fd.FoundationNotificationUtil().getPortalSuffix();
	var requestUrl = '/' + portalSuffix + '?id=order_status&table=sc_request&sys_id=' + current.sys_id.toString();
	var fontSize = 'font-size: 16px;';
	var lineHeight = 'line-height: 24px;';
	var notificationUtil = new RequestNotificationUtil();

	var requestDetails = notificationUtil.getRequestDetails(current.sys_id, current);
	var tasks = requestDetails.tasks;
	var totalTasks = requestDetails.totalTasks;

	notificationUtil.createNotificationPrimayAction(template, requestUrl, 'View request');
	template.print('<div style="font-size: 15pt; line-height:30px;"><b>About this request</b></div>');

	var commentLeft = notificationUtil.getRequestComment(current.sys_id, current.approval);
	if (commentLeft) {
		template.print('<div style="padding-top: 16px; ' + fontSize + lineHeight + '"><span>Rejection notes: </span>' + '<span style="font-weight: 600;">' + commentLeft + '</span></div>');
	}
    //For reject comments added to RITM record
	var commentLeftRITM = notificationUtil.getRejectCommentRITM(current.sys_id);
    if (commentLeftRITM) {
        template.print('<div style="padding-top:18px; ' + fontSize + lineHeight + '"><span>Rejection notes: </span>' + '<span style="font-weight: 600;">' + commentLeftRITM + '</span></div><br />');
    }
	if (requestDetails.totalTasks > 1) {
		template.print('<div style="font-size: 15pt;padding-top:16px;font-weight:600;">Requested items (' + requestDetails.totalTasks + ')</div>');
	}
	tasks.forEach(function (task, index) {
		var borderBottom = 'border-bottom:1px solid #DADDE2';
		template.print('<div style="padding-top:16px;padding-bottom:16px;');
		if (requestDetails.totalTasks > requestDetails.tasks.length || (index + 1 < requestDetails.tasks.length)) {
			template.print(borderBottom);
		}
		template.print('">');
		template.print('<div style="' + fontSize + lineHeight + '"><span>Requested item number:</span> <span style="font-weight: 600;">' + task.requestNumber + '</span></div>');
		template.print('<div style="' + fontSize + lineHeight + '"><span>Short description: </span><span style="font-weight: 600;">' + task.item + '</span></div>');
		template.print('</div>');
	});

	if (totalTasks > 3) {
		template.print('<div style="' + fontSize + lineHeight + 'padding-top:16px; padding-bottom:16px;"><a style="color:#3C59E7" href="' + requestUrl + '">');
		template.print(gs.getMessage('View all items'));
		template.print('</a></div>');
	}
})(current, template, email, email_action, event);
