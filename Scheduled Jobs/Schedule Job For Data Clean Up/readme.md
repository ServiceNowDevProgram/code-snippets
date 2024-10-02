Overview : 
  This script automates the cleanup of old closed incidents in the ServiceNow instance. It helps maintain a clean and efficient database by removing records that are no longer needed, thereby improving system performance and manageability.

Features
  Automatic Cleanup: Deletes closed incidents that are older than 90 days.
  Customizable Timeframe: Easily adjustable parameters to change the age of incidents for cleanup.
  Logging: Outputs the number of incidents deleted to the system logs for tracking purposes.

Prerequisites
  Access to a ServiceNow instance with appropriate permissions to run scripts.
  Knowledge of how to create Scheduled Jobs in ServiceNow.

Installation
  Create a New Scheduled Job:
    Navigate to System Definition > Scheduled Jobs in your ServiceNow instance.
    Click on New to create a new Scheduled Job.

Configure the Job:
  Name: Enter a descriptive name for the job, e.g., "Cleanup Old Closed Incidents."
  Run: Set the desired schedule for when you want the job to run (e.g., daily, weekly).
  Script: Copy and paste the provided javascript into the script section of the Scheduled Job.
