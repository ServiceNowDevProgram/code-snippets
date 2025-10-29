Script Action: Notify Manager on User Deactivation

Overview
This Script Action is triggered when the event user.deactivation.notify_manager is fired by a background or scheduled job.
It dynamically sends an email notification to the manager of the deactivated user using the GlideEmailOutbound API.

Purpose
Automatically inform a user’s manager when their account has been deactivated due to inactivity.
Use event-driven notification — no direct email sending in the scheduled job script.
Keep manager email addresses dynamic, using event parameters (parm1, parm2).

Event and Parameters
The Script Action listens for this event:
Event name: user.deactivation.notify_manager

Explanation
parm1 and parm2 are populated dynamically by the job that fired the event.
parm1 → user’s name
parm2 → manager’s email
GlideEmailOutbound is used to send emails programmatically without needing a Notification record.
The message body is kept simple and readable, but can be formatted in HTML if needed.
