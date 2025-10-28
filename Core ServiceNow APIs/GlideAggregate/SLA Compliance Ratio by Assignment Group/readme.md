Overview

This script calculates the SLA breach percentage for each assignment group based on closed incidents in ServiceNow.
It leverages GlideAggregate to count both total SLAs and breached SLAs efficiently, providing key SLA performance insights.

Useful for:
	•	SLA dashboards
	•	Support performance tracking
	•	Service improvement reports

Objective

To determine, for each assignment group:
	•	How many SLAs were closed
	•	How many of those breached
	•	The resulting SLA compliance percentage

Script Logic
	1.	Query the task_sla table.
	2.	Filter for closed SLAs linked to incidents.
	3.	Aggregate total SLAs (COUNT) and breached SLAs (COUNT, 'breach', 'true').
	4.	Group results by assignment group.
	5.	Calculate breach percentage.
