GRC Policy Deletion Guard
Overview
This Business Rule enhances data integrity for ServiceNow's Governance, Risk, and Compliance (GRC) module. It prevents the deletion of a sn_compliance_policy record if it is still associated with any active controls. This ensures that policy changes are managed properly and prevents compliance gaps that could occur if a foundational policy is removed while dependent controls are still active.
Details
Script Name: Prevent Delete of Policy with Active Controls
Target Table: sn_compliance_policy
Run Time: before delete
Action: Prevents a policy from being deleted if it has active, linked controls. Displays an error message to the user and aborts the deletion action.
Logic:
Uses GlideAggregate for an efficient query on the many-to-many (m2m) table (sn_compliance_m2m_policy_policy_statement) that links policies to control statements.
The query filters for records where:
The document field matches the sys_id of the policy being deleted.
The related content record (the control statement) has its active field set to true.
A COUNT aggregate is performed on the filtered records.
If the count is greater than zero, the script adds an error message to the form and aborts the deletion process using current.setAbortAction(true).
Business Rule Configuration
To implement this functionality, configure the following settings in the Business Rule record:
Name: Prevent Delete of Policy with Active Controls
Table: sn_compliance_policy
When to run:
When: before
Delete: checked
Advanced: checked


Purpose and Benefits
This Business Rule provides the following benefits to the GRC application:
Data Integrity: Prevents the accidental or erroneous deletion of policies that are still in active use, thereby preventing broken relationships in your GRC data model.
Controlled Changes: Enforces a process where administrators must first inactivate or re-associate all controls linked to a policy before it can be deleted, ensuring proper change management.
User Feedback: Provides clear and immediate feedback to the user, explaining why the requested action was denied and outlining the necessary steps to proceed.
Performance: Utilizes the efficient GlideAggregate method, which scales well even on large production instances.
Usage
This script is a core part of GRC data governance. If a user attempts to delete a policy with active controls, they will see an error message and the deletion will be stopped. The user must navigate to the related controls and either make them inactive or associate them with a different policy before attempting to delete the original policy again.



