# Role Usage Analyzer for ServiceNow

## Overview

This script analyzes role assignments in your ServiceNow instance and identifies roles that are assigned to users but appear to be unused. It cross-references user activity logs to determine whether assigned roles are actively used.

## Features

- Scans all roles assigned to users
- Checks user activity via `sys_history_line` to infer role usage
- Flags roles that are assigned but show no signs of usage
- Logs unused roles and the number of users assigned to them

## Usage

1. Navigate to **System Definition > Scheduled Jobs**.
2. Create a new Script Include or Scheduled Job named `Role_Usage_Analyzer`.
3. Paste the contents of `Role_Usage_Analyzer.js` into the script field.
4. Run the script manually or schedule it to run periodically (e.g., weekly or monthly).

## Notes

- This script uses `sys_history_line` to infer user activity. For more accurate results, consider integrating with login logs or audit tables if available.
- You can extend the script to automatically notify administrators or generate reports.
- Roles used only in background scripts or integrations may not show up in history logs — manual review is recommended.

