Business Rule: Validate CI on Deployed Assets

Overview : This Business Rule enforces CMDB integrity by ensuring that any asset marked as "Deployed" must be linked to a valid "Configuration Item (CI)". If no CI is associated, the rule automatically notifies the assigned user's manager to take corrective action.

This consists of 3 steps:
1.	Business rule
2.	Event setup
3.	Email Notification

1.Business Rule Configuration 
Table: alm_asset 
Type: Business Rule 
When to run: After Update 
Condition : current.install_status == 'Deployed' && !current.ci

2.Event Setup 
Go to System Policy > Events > Event Registry 
Click New Name: asset.ci.missing 
Table: alm_asset 
Description: Triggered when deployed asset has no CI

3.Email Notification 
Go to System Notification > Email > Notifications 
Create a new notification: 
Name: Missing CI on Deployed Asset 
Table: alm_asset 
When to send: Event is fired → asset.ci.missing 
Recipients: Event.parm1 (manager) 
Subject: Asset numberisdeployedwithoutaCI
Message:
Hello{recipient.name}, The asset ${number} assigned to ${assigned_to.name} is marked as Deployed but has no linked Configuration Item. Please review and take appropriate action. Regards, IT Asset Management