(function executeRule(current, previous /*null when async*/) {

	// Check RITM for attachments and pass True/False to client via scratchpad
	var grAttachment = new GlideRecord('sc_req_item');
	grAttachment.addQuery('sys_id', current.request_item);
	grAttachment.query();
	if (grAttachment.next()){
			g_scratchpad.hasAttachments = grAttachment.hasAttachments();
	}
	
})(current, previous);
