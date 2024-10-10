Description: Scheduled Job to Archive Closed Incidents
This scheduled job is designed to automatically archive closed incidents that are older than one year. By doing so, it helps maintain a lean and efficient incident table, improving performance and manageability within the ServiceNow instance.

Key Features:

Targeted Archiving: The job identifies incidents that have a state of "Closed" and were created over a year ago, ensuring that only outdated records are archived.

Data Preservation: Instead of deleting closed incidents, the job transfers relevant data to an archive table, allowing for historical reference and compliance with data retention policies.

Automated Process: Scheduled to run at regular intervals (e.g., daily or weekly), the job reduces the administrative burden of manually managing old incident records.

Notification and Logging: As part of the process, it logs the actions taken (such as archiving and deletion) to provide visibility and traceability for audits and reviews.

Benefits:

Improved Performance: By keeping the incident table smaller, the job enhances query performance and overall system responsiveness.

Historical Data Access: Archived incidents can still be accessed for reporting and analysis, preserving valuable information without cluttering the active table.

Compliance and Audit Ready: Ensures that data retention practices meet organizational policies and regulatory requirements by managing the lifecycle of incident records effectively.

This scheduled job is a crucial part of an organization's data management strategy, ensuring that the ServiceNow instance remains efficient and organized over time.
