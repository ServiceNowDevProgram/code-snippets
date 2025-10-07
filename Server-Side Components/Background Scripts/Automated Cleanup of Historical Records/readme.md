## Purpose
This script automates the cleanup of historical records (closed incidents older than 90 days) while preserving records linked to active change requests or tasks. This helps improve system performance and database maintenance.

## Use Case
- Remove outdated incidents that are no longer required.
- Prevent accidental deletion of records linked to other critical tables.
- Can be extended to other tables like `problem`, `change_request`, etc.

## Script Details
- **Table:** `incident`
- **Filter Criteria:**
  - Closed incidents (`state = 7`)
  - Older than 90 days (`closed_at <= gs.daysAgo(90)`)
- **Safety Checks:** Skips records linked to `change_request` or child `task` records.
- **Execution:** Can be run as Background Script or Scheduled Script Execution.
- **Logging:** Outputs skipped and deleted records count in system logs.
