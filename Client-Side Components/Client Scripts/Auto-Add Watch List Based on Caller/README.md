
Auto-Add Watch List Based on Caller Department

//Use Case : 

Automatically adds relevant users to the Watch List field when a Caller is selected on Incident.
Keep department leads or stakeholders automatically informed.

//Logic: 

Client Script runs onChange of the Caller field.
Calls a Client callable Script Include ('WatchListHelper) via GlideAjax.
Script Include fetches Department manager
Adds their sys_id to the Watch List field.
Prevents duplicates by appending to existing watch list values.
