# Table Size Analysis Script

This script checks the number of records in selected ServiceNow tables and shows how many were created in the last 30 days.

## Tables Checked
- `task`
- `cmdb_ci`
- `sc_cat_item`

## What It Does
- Logs the start of the analysis.
- Counts total records in each table.
- Counts records created in the last 30 days.
- Logs both counts to the system log.

## How to Use
1. Add or remove table names in the `tablesToCheck` list.
2. Run the script in a background script or scheduled job.
