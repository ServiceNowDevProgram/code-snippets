ServiceNow Background Script – Add Comments on Behalf of a User
Overview

This ServiceNow Background Script allows you to add comments or work notes to a record on behalf of a specific user.
Normally, when comments are added directly via scripts, they appear as the integration user. Using this script, the comment will show the actual user in the Activity Formatter.

This is perfect for Hacktoberfest contributions, demos, or integration testing.

Features

Works directly in Scripts – Background in ServiceNow.

Adds comments or work notes as a specified user.

Can be used for the Incident table or easily adapted for other tables.

Logs success or error messages in the Background Script output.

How to Use

Open Scripts – Background in your ServiceNow instance.

Copy and paste the script.

Update the input variables at the top of the script:

var incidentSysId = 'INCIDENT_SYSID'; // sys_id of the record
var userName = 'john.doe';                 // user_name to attribute the comment to
var commentText = 'Your comment here';     // comment content
var journalField = 'comments';             // 'comments' or 'work_notes'


Click Run Script.

Check the Activity Formatter of the record to see the comment added under the correct user.

Example
var incidentSysId = '1234567890abcdef';
var userName = 'john.doe';
var commentText = 'This is my Hacktoberfest comment!';
var journalField = 'comments';


After running, the comment will appear in the Incident’s activity log as if john.doe added it.
