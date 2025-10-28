Scheduled Job: Deactivate Inactive Users and Notify Managers

Overview
This scheduled job automatically deactivates inactive users based on their last login time and creation date, and sends an email notification to their active manager using the ServiceNow event framework (gs.eventQueue()).

The entire process is divided into three components:
1.Scheduled Job Script — Finds inactive users and fires an event.
2.Event Registration — Registers user.deactivation.notify_manager in the Event Registry.
3.Script Action — Sends an email to the manager dynamically.

1. Scheduled Job Script

Purpose
This script runs on a schedule (e.g., daily or weekly) and:
Finds users who haven’t logged in for a specific number of days.
Checks their account creation date.
Deactivates those users.
Fires an event to notify their manager if the manager is active.

Logic Summary
Calculates a cutoff date (e.g., 90 days of inactivity).
Queries sys_user for users:
Whose last_login_time is older than the cutoff date OR is empty.
Whose sys_created_on is older than the cutoff date.
Who are currently active.
For each matching user:
    Finds their manager record.
    Checks if the manager is active.
    Deactivates the user.

Sends an event with:
    parm1: User name
    parm2: Manager’s email

2. Event Registration:

Name: user.deactivation.notify_manager
Table: sys_user
Description: “Triggered when a user is deactivated due to inactivity.”

3. Script Action Setup

Name: Notify Manager on User Deactivation
Event name: user.deactivation.notify_manager
