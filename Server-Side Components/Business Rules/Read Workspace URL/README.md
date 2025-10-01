Display BR that reads the caller_id parameter from the Workspace URL (agent or sow) for creating a new record/interaction and seearches 
for the corresponding user to set it in the g_scratchpad to be used as default value in the new Interaction form. 
eg url https://instance-name.service-now.com/now/sow/record/interaction/-1_uid_1/params/query/active%3Dtrue%5Ecaller_id=<email>

The scratchpad can be used in an onLoad client script like so:
   if (g_form.isNewRecord())
		g_form.setValue('opened_for', g_scratchpad.caller_id);
