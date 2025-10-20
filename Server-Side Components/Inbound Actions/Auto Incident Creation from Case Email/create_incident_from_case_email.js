(function runAction(/*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {

	//Extract email subject and body
	var subject = email.subject.toLowerCase();
	var body = email.body_text.toLowerCase();

	//Define trigger keywords for creating the incident
	var keywords = ['outage', 'crash', 'down', 'error', 'issue', 'not working', 'failure', 'slow'];
	var trigger = false;

	for(var i = 0; i < keywords.length; i++){
		if(subject.includes(keywords[i]) || body.includes(keywords[i])){
			trigger = true;
			break;
		}
	}

	//Execute only if trigger word found
	if(trigger){
		//Create a new incident record
		var inc = new GlideRecord('incident');
		inc.initialize();
		inc.short_description = 'Auto-created from Case ' + current.number + ': ' + email.subject;
		inc.description = 'Customer reported via Case ' + current.number + ':\n' + email.body_text;
		inc.parent = current.sys_id;

		//Link caller and CI from case to incident if available
		if(current.contact)
			inc.caller_id = current.contact;
		if(current.cmdb_ci)
			inc.cmdb_ci = current.cmdb_ci;

		var incSysId = inc.insert();

		//Update case work notes
		current.work_notes = 'Incident ' + inc.number + ' created automatically from customer email.';
		current.update();

		//Add incident work notes
		var newInc = new GlideRecord('incident');
		if(newInc.get(incSysId)){
			newInc.work_notes = 'Auto-created from Case ' + current.number + '.\n\nEmail Content:\n' + email.body_text;
			newInc.update();
		}
	}
})(current, event, email, logger, classifier);
