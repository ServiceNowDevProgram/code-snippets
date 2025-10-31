
Delete Inactive Users Without Login History

This ServiceNow background script identifies and deletes inactive users who have never logged into the system. It's useful for cleaning up unused accounts and maintaining a secure, lean user base.

- Identify users marked as `active = false`
- Check if they have any login records in the `syslog` table
- Delete users who have no login history
