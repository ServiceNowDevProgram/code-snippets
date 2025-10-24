**This is an enhancement to the current code**
1. Added "open in Workspace" Button to open the record in workspace(defined in option schema), since it is gaining popularity now.
2. Enhanced the visibility condition so that the button is only visible on pages having sys_id and table in url.
3. Enhanced css to improve visibility of button.
4. This button wll look for the table to workspace mapping (in option schema) and create the URL to open record in respective workspace. If now mapping is found, the record is opened in SOW workspace(default).

Widget will create a button that will only be visible to users with the itil role that will take them to the same record in platform. will work with the form and standard ticket pages (or anywhere with the table and sysId in the url.
