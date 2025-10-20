contribution
A fix script is used to remove inactive users from the specified list of Groups. The script checks for users who have been inactive in the system more than 7 days from the current date and removes them from the respective groups accordingly. If users are inactive within 7 days then users will skip for deletion.

Additionally, if any of these users are assigned to existing open incidents, the "Assigned to" field on those open incidents will be cleared.

Groups:
IT ServiceNow L1 IT ServiceNow L2 IT ServiceNow L3

Fix script Goal:
Fix script 1name - Remove Inactive Users from Groups Record for Rollback - Enable check box

The goal of Fix script is to clean up inactive users from the above mentioned groups in ServiceNow, and unassign anyincidents they were responsible for — but only if they have been inactive for more than 7 days.

Taking Groups sysid in system Property with "," seperator

Queries group members (sys_user_grmember) where the group matches one of the specified groups.

Skips for Active users , Inactive users who were updated in the last 7 days.

Finds Incident assigned to the user that are not closed (assuming state = 3 means closed). Clears the assigned_to field and updates the record.

System Property : Store groups sysid.

