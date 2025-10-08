If a Change Request hasn't been moved to "Assess" state within 48 hours of submission,
automatically send a reminder and log escalation task.
This is a hybrid of a Business Rule + Scheduled Job (or Flow).
This code sets up an automated escalation process for change requests in ServiceNow. When a new change request is created, it schedules a job to run after 48 hours using a `sys_trigger`. 
If the change is still in the "New" state at that time, the Script Include sends a notification event and creates an escalation task assigned to the Change Management group. This ensures timely review and prevents unattended change requests.
