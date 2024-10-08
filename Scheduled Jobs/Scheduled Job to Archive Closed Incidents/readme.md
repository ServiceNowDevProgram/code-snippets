Description: This scheduled job is designed to automatically archive closed incidents that are older than 90 days. 
By moving these records to a separate archive table, the job helps maintain system performance, manage database size, and enhance the overall efficiency of incident management processes.

Key Features:
Automated Archiving: The job runs on a defined schedule (e.g., weekly) to check for closed incidents that exceed a specified age (e.g., 90 days).
Data Management: By archiving old incidents, it reduces clutter in the primary incident table, making it easier for users to find and manage active incidents.
Retention Compliance: Helps organizations adhere to data retention policies by managing the lifecycle of incident records.
