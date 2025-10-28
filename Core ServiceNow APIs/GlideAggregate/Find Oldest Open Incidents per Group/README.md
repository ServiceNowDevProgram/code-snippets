ServiceNow Script: Find Oldest Open Incidents per Group
This script leverages GlideAggregate to efficiently find the oldest active incident for each assignment group. This is a powerful tool for monitoring and reporting on potential service level agreement (SLA) risks and improving incident management processes.
Overview
The script performs the following actions:
Initializes GlideAggregate: Creates an aggregate query on the incident table.
Filters Active Incidents: Uses addActiveQuery() to restrict the search to only open (active) incidents.
Aggregates by Minimum Date: Finds the minimum (MIN) opened_at date, which represents the oldest record.
Groups by Assignment Group: Groups the results by the assignment_group to get a separate result for each team.
Iterates and Logs: Loops through the query results and logs the assignment group and the opening date of its oldest open incident.
How to use
This script is intended to be used in a server-side context within a ServiceNow instance. Common use cases include:
Scheduled Job: Run this script on a regular schedule (e.g., daily) to generate a report on aging incidents.
Script Include: Incorporate the logic into a reusable function within a Script Include, allowing other scripts to call it.

Use code with caution.

Installation
As a Scheduled Job
Navigate to System Definition > Scheduled Jobs.
Click New and select Automatically run a script of your choosing.
Name the job (e.g., Find Oldest Open Incidents).
Set your desired frequency and time.
Paste the script into the Run this script field.
Save and activate the job.
As a Script Include
Navigate to System Definition > Script Includes.
Click New.
Name it (e.g., IncidentHelper).
API Name: global.IncidentHelper


Customization
Change the output: Modify the gs.info() line to instead write to a custom log, send an email, or create a report.
Refine the query: Add more addQuery() statements to filter incidents by other criteria, such as priority or category.
Change the aggregate: Use MAX instead of MIN to find the newest incident in each group.
Get incident details: To get the actual incident record (e.g., its number), you would need to perform a secondary GlideRecord query based on the aggregated data.
Dependencies
This script uses standard ServiceNow APIs (GlideAggregate, gs). No external libraries are required.
