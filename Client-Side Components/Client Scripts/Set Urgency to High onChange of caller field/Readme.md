VIP Caller — Auto-Set Urgency Client Script (ServiceNow)
Overview

This Client Script automatically sets the Urgency field to High (1) whenever a VIP caller is selected on a ServiceNow form.

It also shows a field-level info message to notify the user why urgency was updated. The script ignores non-VIP callers, ensuring normal behavior for regular users.

Features

Automatically detects when a VIP caller is selected.

Sets the Urgency field to High (1).

Displays a field-level message below the urgency field ("Urgency automatically set to High because caller is VIP").

Works dynamically every time the caller field changes.

Compatible with Classic UI forms.

Ensures non-VIP callers do not trigger urgency changes.

Usage Instructions
1. Create the Client Script

Navigate to System Definition → Client Scripts.

Click New to create a client script.

2. Configure the Script

Name: VIP Caller Urgency

Table: incident 

Type: onChange

Field: caller_id

Active: Checked
