## Use the job to trigger timesheet reminder notification to manager for users reporting to them

### Check with time_sheet_reminder_job.js for the scheduled job code.

*Note: Notifications and Events to be configured sepearately.*

### Notification body sample below 

*Hi,*  

*This is to notify you the following users are timesheet defaulters from last week.*

*${mail_script:timesheet_mail_script.js} //timesheet_mail_script.js can also be found in the same folder.

*ServiceNow Team*
