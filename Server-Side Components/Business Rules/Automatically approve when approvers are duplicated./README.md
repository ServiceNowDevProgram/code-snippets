In certain scenarios, the same approver might appear multiple times in the approval flow for a Change or Request. This code snippet ensures that if an approver has already approved the request once, any subsequent approval requests assigned to them are automatically marked as approved.

###Usage Instructions

Create a new Business Rule on the sysapproval_approver table.
Set the rule to run before insert or update.
Paste the script into the Script field.
Test in a sub-production environment to ensure expected behavior.

###Notes

This rule helps reduce redundant approvals and improves efficiency.
Ensure that business logic and compliance requirements allow auto-approvals before deploying.