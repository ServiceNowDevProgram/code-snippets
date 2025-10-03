This business rule is designed for ServiceNow to prevent a parent incident from being closed or resolved while it still has active child incidents.
If a user attempts to set the parent incident's state to "Resolved," "Closed," or "Cancelled," the rule will query for any related child incidents that are still open. 
If open children are found, the update will be aborted, and an error message will be displayed to the user.

Navigate to System Definition > Business Rules in the ServiceNow filter navigator.
Click New.
Fill out the form with the following details:
Name: Prevent Parent Closure with Open Children
Table: Incident [incident]
Advanced: true
When: before
Update: Check this box.
In the When to run tab, set the Condition field:
current.state.changesTo(7) || current.state.changesTo(6) || current.state.changesTo(8)  //The state values are: 6 (Resolved), 7 (Closed), 8 (Cancelled).
Note: The state values (6, 7, 8) may vary based on your instance configuration.
In the Advanced tab, paste the provided script into the Script field.
