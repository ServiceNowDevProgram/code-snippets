Business Rule: Auto-Close Incident When All Related Changes Are Closed
Table : change_request
When to Run: After update
Condition: state changes to Closed (or your equivalent "Closed" state number, e.g. state == 3)

Detailed Working
1. Trigger Point
This After Business Rule runs after a Change Request record is updated.
Specifically, it checks when the state changes to “Closed”.

2. Check for Related Incident
The script retrieves the incident reference field (incident) from the current change request.
If there’s no linked incident, it skips execution.

3. Check for Any Remaining Open Change Requests
A new GlideRecord query checks for other Change Requests linked to the same incident where:
If any such records exist, it means not all change requests are closed — so the incident remains open.

4. Close the Incident Automatically
If no open Change Requests remain, the script:
Fetches the linked incident.
Sets:	state = 7 (Closed)
	close_code = Auto Closed
	close_notes = Auto closure as all changes are closed.
Updates the record.
