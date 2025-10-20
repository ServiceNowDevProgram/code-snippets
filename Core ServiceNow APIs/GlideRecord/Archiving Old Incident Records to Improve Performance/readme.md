## Purpose
This document explains how to archive old incident records from the `incident` table to an archive table `ar_incident` to improve performance, while preserving historical data for reporting and audit purposes.
## Solution Overview
Use **ServiceNow Archive Rules** to automatically move incidents to an archive table based on specific conditions:
- Incidents that are **closed**.
- Incidents that are **inactive** (`active = false`).
- Incidents that were closed **150 days ago or earlier**.
The records are moved to the archive table `ar_incident`, which preserves all necessary fields for historical reference.
