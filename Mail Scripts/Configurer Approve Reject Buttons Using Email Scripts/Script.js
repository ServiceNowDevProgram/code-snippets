(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
/* Optional GlideRecord */ event) {
	var emailID = gs.getProperty('instance_name')+"@service-now.com";
	var apButStr = '<a href="mailto:'+emailID+'?subject=Re:'+current.sysapproval.number+' - approve&body='+ email.watermark +'"><img src="/approve.png" alt="Approve" width="94" height="34"></a>';
	
	var rejButStr = '<a href="mailto:'+emailID+'?subject=Re:'+current.sysapproval.number+' - reject&body='+ email.watermark +'"><img src="/reject.png" alt="Reject" width="93" height="33"></a>';
	
//	var full = apButStr + rejButStr;
	template.print(apButStr  +'&nbsp;&nbsp;'+ rejButStr);
	
})(current, template, email, email_action, event);
