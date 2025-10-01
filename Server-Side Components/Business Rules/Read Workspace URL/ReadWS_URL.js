(function executeRule(current, previous /*null when async*/) {
	// for new record
    if (current.isNewRecord()) {
        // read the URL
		var txn = GlideTransaction.get();
		if (!txn)
			return;
		var request = txn.getRequest();
		if (!request)
			return;
		var referer = decodeURIComponent(request.getHeader("Referer"));
		
		if (GlideStringUtil.nil(referer))
			return;
		// use regular expression to read the parameters from the referer - we just need the last group	
		var matches = referer.match(/\/(agent|sow)\/(chat|record\/interaction)\/-1_uid_1\/params\/query\/(.*)/);
		if (!matches || matches.length < 4)
			return;		
		// if there is no caller_id in the query parameters, dont do anything
		if (matches[3].indexOf('caller_id') < 0)
			return;
		// parse the parameters and when encountering caller_id, get the user's unique identifier - in this case the email address - and set it in the scratchpad
		var params = matches[3].split('^');
		for (var i=0; i<params.length;i++) {
			// the parameters are key=name value pairs
			var param = params[i].split('=');			
			if (param.length == 2 && param[0] == 'caller_id') {
				var grUser = new GlideRecord('sys_user');
				if (grUser.get('email', param[1])) {
					g_scratchpad.caller_id = grUser.getUniqueValue();
				}
				return;
			}
		}
	}
})(current, previous);

