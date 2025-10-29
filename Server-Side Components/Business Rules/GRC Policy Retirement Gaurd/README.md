GRC Policy Retirement Guard with Control Objective Check
Overview
This Business Rule enhances data integrity and process governance within ServiceNow's GRC module. It prevents a sn_compliance_policy record from being marked with the "Retired" state if it is still associated with any active Control Objectives. The rule enforces a proper decommissioning process, ensuring that all dependent Control Objectives are either made inactive or delinked before the policy itself can be retired.
Details
Script Name: Prevent Retire of Policy with Active Control Objectives
Target Table: sn_compliance_policy
Run Time: before update
Condition: State changes to Retired
Action: Prevents a policy from being retired if it has active, linked Control Objectives. It displays an error message to the user and aborts the update action.
Logic:
Efficient Counting: Uses GlideAggregate for a highly performant query on the many-to-many (m2m) table (sn_compliance_m2m_policy_policy_statement), which links policies to control statements (in this case, acting as Control Objectives).
Query Filtering: The query targets the m2m table and filters records where:
The document field matches the sys_id of the policy being updated.
The related content record (the Control Objective) has its active field set to true.
Aborts Action: If the count of active Control Objectives is greater than zero, the script:
Displays an informative error message to the user.
Aborts the update process using current.setAbortAction(true), preventing the policy from being set to Retired.
Business Rule Configuration
To implement this functionality, configure the following settings in the Business Rule record:
Name: Prevent Retire of Policy with Active Control Objectives
Table: sn_compliance_policy
When to run:
When: before
Update: checked
Condition: [State] [changes to] [Retired]
Advanced: checked


Purpose and Benefits
This Business Rule provides the following benefits to the GRC application:
Process Governance: Enforces a controlled process for policy retirement, ensuring that all dependent Control Objectives are handled appropriately before the policy is decommissioned.
Data Integrity: Prevents the creation of orphaned Control Objectives or inconsistencies in compliance reporting.
Compliance: Ensures that compliance teams maintain an accurate and up-to-date record of active policies and their underlying Control Objectives.
User Feedback: Provides immediate and clear feedback to the user, explaining why the retirement action was denied and outlining the necessary steps to proceed.
Performance: Utilizes the efficient GlideAggregate method, which is best practice for performing counts on large tables.
Usage
This script is a core part of GRC data governance. If a user attempts to set a policy's State to Retired while active Control Objectives are still linked, they will see an error message and the update will be stopped. The user must first either inactivate or delink all related Control Objectives before attempting to retire the policy again.
