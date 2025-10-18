# Role Usage Analyzer (Audit-Based) for ServiceNow

## Overview

This script analyzes role assignments and identifies roles that may be unused by checking user activity in the `sys_audit` table. It focuses on recent activity (last 90 days) to determine whether users assigned to a role have interacted with the system.

## Features
- Uses `sys_audit` for accurate activity tracking
- Filters audit records from the **last 90 days** to reduce data volume
- Flags roles assigned to users who show **no audit activity**
- Logs potentially unused roles with user count

## Usage

1. Navigate to **System Definition > Script Includes** or **Scheduled Script Executions**.
2. Create a new Script Include or Scheduled Job named `Role_Usage_Analyzer_Audit`.
3. Paste the contents of `Role_Usage_Analyzer_Audit.js` into the script field.
4. Run manually or schedule it to run periodically (e.g., monthly).

## Notes

- The script uses `gs.daysAgo(90)` to limit the audit data to recent activity.
- You can adjust the time window by changing the `gs.daysAgo()` value.
- Consider extending the script to generate reports or notify role owners for cleanup.
