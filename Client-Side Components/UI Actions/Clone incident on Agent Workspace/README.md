Agent can use this UI Action on incident form to clone/copy any existing incident.

This UI Action will create a copy of incident once agent confirm the action.

Caller field will not be copeied to newly created incident, only basic information of ticket like Company, Short Description, Category, Sub-Category 

Create an UI Action with below field values:

Name - Clone Incident

Action Name - clone_incident

Table - Incident

Client - checked (true)

Onclick - cloneIncident();

Workspace Form Button - checked (true)

Script - use clone_incident.js

Workspace Client script - use workspace_client_script.js
