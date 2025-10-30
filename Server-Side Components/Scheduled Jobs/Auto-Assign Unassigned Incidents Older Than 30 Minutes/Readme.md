This scheduled job automatically assigns unassigned incidents in ServiceNow to a random active user from the incident’s assignment group, but only if the incident is at least 30 minutes old.
It ensures timely triaging of new incidents and avoids backlog accumulation caused by unassigned tickets.

How It Works

Identify Eligible Incidents
  Fetch all incidents from the incident table whereassigned_to is empty (unassigned) and assignment_group is not empty
  
Find Active Group Members
  For each incident, look up the related group (sys_user_grmember table).Join with the sys_user table. This allows filtering users based on their active status.

Random Assignment
  From the list of active members, pick a random user. Assign that user to the incident’s Assigned To field

Update & Log
  Update the incident record in the database. Log success or skip messages to the system log
