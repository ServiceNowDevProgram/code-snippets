# Show Today Emails Logs

The UI Action simplifies the debugging of ServiceNow notifications by redirecting you from the notification definition to the email log list view with the predefined filter.

Setting:
- Name: Show Today Emails Logs
- Table: sysevent_email_action
- Show insert: false
- Show update: true
- Client: true
- Form link: true
- Onclick: openEmailLogList()
- Condition: new GlideRecord('sys_email_log').canRead()