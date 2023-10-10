Type: Business Rule
When: onDisplay
example Table: sys_script

This script gets the domain of the user session, and the domain of the record that you call it from, such as an onLoad Client Script.
Help to prevent accidental inserts of scripts in the wrong domain
eg:
Table: sys_script

function onLoad() {
	var currentUserDomain = g_scratchpad.currentDomain;
	var currentRecordDomain = g_scratchpad.recordDomain;
	
	if (currentUserDomain == 'Global') {
		g_form.addErrorMessage('You are currently in the Global domain. Editing this record won\'t create another record');
	} else if (currentUserDomain == currentRecordDomain) {
		g_form.addErrorMessage('You are currently in the same domain as the record you are about to edit: ' +currentUserDomain);
	} else {
		g_form.addErrorMessage('Your current domain is: ' +g_scratchpad.currentDomain +', and the record you are editing is in the ' +g_scratchpad.recordDomain +' domain. If you save any edits, the action will create a new record in your current domain');
	}
}
