Description:

This business rule is implemented to automatically calculate the resolution time of an incident upon its closure, providing valuable metrics for incident management and service performance analysis.

Trigger: The rule runs After Update when the state of an incident is changed to "Closed."

Logic:

It checks if the current incident's state is "Closed" and whether the resolved_at timestamp is set.
The resolution time is calculated by subtracting the incident's creation timestamp (sys_created_on) from the resolution timestamp (resolved_at).
The calculated resolution time is then stored in a custom field designated for this purpose (e.g., resolution_time).
Purpose: This automation provides insights into how long it takes to resolve incidents, helping the support team analyze performance, identify trends, and improve processes. By having this data readily available, organizations can enhance their service delivery and make informed decisions regarding resource allocation and efficiency improvements.

This approach aids in fostering a culture of accountability and continuous improvement within the incident management process.
