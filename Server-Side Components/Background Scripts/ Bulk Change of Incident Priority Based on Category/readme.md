Bulk Incident Priority Updater
Overview

This ServiceNow background script automatically updates the priority of multiple incidents based on their category.
It helps administrators and developers maintain consistent priority levels aligned with business rules — without manual updates.

Use Case

Here’s how it works:

Incidents under the Network category are set to Priority 1 (Critical)

Incidents under Application are set to Priority 2 (High)

Incidents under Hardware are set to Priority 3 (Moderate)

This approach saves time and ensures priority values remain standardized across the platform.

Script Details
Field	Value
Table	incident
Type	Background Script
Author	Sachin Narayanasamy
Language	JavaScript (GlideRecord)
Logic Flow

Define a category-to-priority mapping inside the script.

Query all active incidents in the system.

For each incident:

Retrieve its category.

If the category exists in the mapping and the current priority is different, update the record.

Log updates for each incident with its number and new priority.

Display a summary showing how many incidents were updated and skipped.
