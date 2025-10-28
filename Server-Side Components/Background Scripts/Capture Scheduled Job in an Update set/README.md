Scheduled Job Update Set Capture Script

This ServiceNow background script addresses a critical deployment challenge by programmatically capturing scheduled jobs in update sets. 
By default, ServiceNow scheduled jobs are not automatically captured in update sets, making them difficult to migrate between environments. 
This script uses the GlideUpdateManager2 API to force a scheduled job record into the current update set, enabling seamless deployment through standard update set processes.
