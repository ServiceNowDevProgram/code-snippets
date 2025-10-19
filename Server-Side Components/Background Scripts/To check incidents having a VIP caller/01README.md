VIP Incident Report — ServiceNow Background Script
Overview

This background script retrieves all incidents where the caller is marked as VIP.
It prints a log showing the incident number, caller name, short description, priority, and state.

This is useful for monitoring VIP requests and quickly identifying high-priority incidents.

How It Works

Queries the Incident (incident) table for records where the caller’s vip field is true.

Loops through all matching incidents.

Retrieves the caller’s name dynamically using caller_id.

Prints incident details to the system logs.

How to Use

Open Scripts - Background in your ServiceNow instance.

Copy and paste the script.

Run the script.

Check the system logs to see all VIP incidents with the caller name displayed.

Example Output
Incidents with VIP Callers:
Number: INC0012345 | Caller: John Doe | Short Description: Network issue | Priority: 1 | State: New
Number: INC0012350 | Caller: Jane Smith | Short Description: Email not working | Priority: 2 | State: In Progress

Notes

Only incidents with a VIP caller will be retrieved.

You can expand this script to include additional fields such as assignment_group or opened_at.

Safe to run in production since it only reads data and prints logs; it does not modify any records.
