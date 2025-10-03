# CI Deduplication Task Generator

This script rechecks the cmdb_ci_hardware table for duplicates by serial number and creates a De-Duplication Task if needed (for records that didn't run through the IRE).

### How It Works

1. Finds all serial numbers that are used on more than one hardware CI.

2. For each group of duplicates, it checks if any of the CIs are already part of an open de-duplication task.

3. If no open task exists, it creates a new one linking all CIs in the group.

4. Logs a summary of actions taken (tasks created, groups skipped).

### Dependencies

This script requires the `global.CMDBDuplicateTaskUtils` Script Include to be active in your instance.

### Configuration & Use

This script is meant to be run as a **Scheduled Job** or as a **Background Script**.

Before you run it, you must set the target table.

```
// Change this line in the script!
var ciTable = "cmdb_ci_hardware" 


```

Change `"cmdb_ci_hardware"` to the table you want to run the script against.

### Example Log Output

```
Starting check for duplicate CIs by serial number...
==> Successfully created task RITM0010123 for Serial Number "VMW-50-81-7A-C9-23-44".
--> Skipping Serial Number "SGH814X025". It is already part of an open task.
--- Re-check Complete ---
Total Duplicate Groups Found: 2
New Remediation Tasks Created: 1
Groups Skipped (Already in an open task): 1
--------------------------


```
