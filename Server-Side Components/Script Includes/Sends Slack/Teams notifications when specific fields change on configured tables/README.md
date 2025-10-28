#  AuditFieldChangeNotifier
### Description
A ServiceNow Script Include that audits changes to specific fields and sends real-time notifications to Slack or Microsoft Teams using a webhook.  
It helps teams monitor important updates like priority or assignment changes without needing to check the platform.
---
### 🔧 Features
- Monitors field-level changes on any table
- Sends rich notifications to Slack/Teams
- Easy to configure via system properties
- Can be reused across multiple tables via Business Rules
---
### 🧩 How to Use
1. **Create a System Property**
  - Name: `x_custom.audit_notifier.webhook_url`
  - Value: Your Slack or Teams webhook URL
2. **Create a Script Include**
  - Name: `AuditFieldChangeNotifier`
  - Paste the provided Script Include code
3. **Create a Business Rule**
  - Table: e.g. `incident`
  - When: `after update`
  - Add this script:
    ```js
    (function executeRule(current, previous) {
        var notifier = new AuditFieldChangeNotifier();
        notifier.notifyOnFieldChange(current, previous, ['priority', 'state', 'assigned_to']);
    })(current, previous);
    ```
4. **Test It**
  - Update one of the watched fields.
  - A message should appear in your Slack/Teams channel like:
    ```
    🛠️ ServiceNow — Field Update Notification
    Record: Incident INC0010001
    Description: Unable to access VPN
    • priority changed from 4 - Low → 2 - High
    • assigned_to changed from John → Alex
    ```
