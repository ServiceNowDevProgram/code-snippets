About this script : 

Type: Before Business Rule
Table: Reminder [reminder]
When: Before Insert or Update

This Business Rule automatically generate a reminder message for Tasks that are approaching their closure time.
It dynamically fills in the Subject, Notes, and Using fields with a formatted message, ensuring consistent and timely communication.

What it does :
It retrieves the Task number from the task field.
It reads the reminder time (remind_me) to know how many minutes before closure the reminder should be sent.
It builds a subject line like:

“Change Request CHG001234 Closure Approaching in 30 Minutes”

It builds a message body explaining the reminder details.
It automatically sets:
subject → reminder subject line
notes → reminder message body
using → "outlook" (indicating reminder channel)

Use of this script :
This automation ensures that Change Managers and implementers are reminded before a Change Request closes, reducing the risk of:
Missing required closure tasks
Incomplete validations or documentation
Unnotified team members before system changes finalize
