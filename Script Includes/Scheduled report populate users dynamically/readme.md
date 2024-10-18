# Set the users of a scheduled report dynamically
The requirement was that ONLY the users who are having an action should receive the email but if they don't have an action on that week then they should not receive the report!

## Example

```
 new ReportsHelper().updateScheduleReportUserList('sys_id_of_scheduled_report');
 
```