# Complex Incident Escalation and Notification

## Description
This code demonstrates how to implement a complex Business Rule for incident escalation and notification in ServiceNow. 
The Business Rule escalates incidents based on priority and time elapsed since creation, notifies the assigned group and incident manager, reassigns the incident to a higher support group if the SLA is breached, and logs all actions taken for auditing purposes.

## Features
- Escalate incidents based on priority and time elapsed since creation.
- Notify the assigned group and incident manager.
- Automatically reassign incidents to a higher support group if the SLA is breached.
- Log all actions taken by the Business Rule.

  ### Business Rule
1. Create a new Business Rule on the Incident table.
2. Set the When to "before" and the Action to "update".
3. Add the following script to the Business Rule with Threshold Time
