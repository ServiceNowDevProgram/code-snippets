Remmediate Licensing for non - Licensable Software Installs

This repository contains a ServiceNow server-side script designed for a data cleanup operation related to Software Asset Management (SAM) installations. The script targets and updates specific records on the cmdb_sam_sw_install table to maintain data accuracy.
Note: This is a working workaround for a bug in Servicenow XANADU SAM application.

Overview
The primary purpose of this script is to ensure that software installations identified as non-licensable do not retain normalized product or publisher information. This prevents these specific records from being included incorrectly in SAM reconciliation and reporting. By clearing the normalization fields on these non-licensable items, the script improves data quality and the integrity of software asset reporting.

Key functions
Targeting non-licensable records: The script uses an encoded query to find all software installation records that have a populated norm_product field, but whose associated product record is not marked as licensable.

Clearing fields: It specifically clears the norm_product and norm_publisher fields on all matching records.

Performance optimization: The script is designed for bulk operations and optimizes performance by disabling business rules and workflows (gr.setWorkflow(false);) during the update process.

Usage
This script is intended to be executed in a ServiceNow instance, typically as a:

Fix Script: A one-time execution for a specific data cleanup task.
Scheduled Job: Can be scheduled to run periodically to maintain data consistency over time.

Important considerations
Backup: As with any data manipulation script, it is highly recommended to test the script thoroughly in a sub-production environment first. Running it on production data should be done with a prior backup or on a limited set of records initially.
Performance: The updateMultiple() method is used for efficiency. The setWorkflow(false) call prevents unnecessary business rule execution and significantly improves performance during large batch updates.
Dependency: The script relies on the Software Asset Management (SAM) Normalization feature being active, as it targets fields populated by that process.


