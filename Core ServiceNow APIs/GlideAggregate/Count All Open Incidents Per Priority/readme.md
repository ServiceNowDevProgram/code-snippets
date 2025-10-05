We want to dynamically calculate the number of open incidents for each priority level (1 - Critical, 2 - High, 3 - Moderate, 4 - Low) using server-side scripting.
Table: incident
Field: priority, state
This script uses **GlideAggregate** to count the number of **open incidents** per priority dynamically. Useful for dashboards, automated scripts, or business rules.
