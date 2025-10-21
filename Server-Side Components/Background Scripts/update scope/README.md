## Description:
This background script updates records in the ServiceNow sys_metadata table by changing their sys_scope value from one application scope to another. Use this script when you need to reassign metadata artifacts (for example during migrations or scope consolidation) from an old scoped application to a new one. Run it only in a development or test instance first.

## Configuration:

1. `oldScopeSysId` — the sys_id of the source (existing) application scope.
    Replace the placeholder string `SYS_ID_OF_THE_FIRST_SCOPED_APP` with the actual sys_id.
2. `newScopeSysId` — the sys_id of the target (new) application scope. 
    Replace the placeholder string `SYS_ID_OF_THE_NEW_SCOPED_APP` with the actual sys_id.
Usage:
3. Logs each successful update and failures if any catches exist.


