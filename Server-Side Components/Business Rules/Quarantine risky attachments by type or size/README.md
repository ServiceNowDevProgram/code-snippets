# Quarantine risky attachments by type or size

## What this solves
Users sometimes upload executables or very large files via email or forms. This rule quarantines risky attachments by copying them off the original record, deleting the original, and keeping an audit trail.

## Where to use
- Table: `sys_attachment`
- When: before insert
- Order: early (for example 50)

## How it works
- Checks file extension and size against configurable thresholds
- Creates or reuses a quarantine record (table `x_quarantine_attachment` or default `incident` as a safe example)
- Copies the new attachment to the quarantine record via `GlideSysAttachment.copy`
- Deletes the original attachment via `GlideSysAttachment.deleteAttachment`
- Logs what happened with minimal, readable messages

## Configure
In the Business Rule:
- `BLOCKED_EXTS`: extensions to quarantine
- `MAX_SIZE_MB`: size threshold
- `QUARANTINE_TABLE`: table to hold quarantined items
- `ASSIGNMENT_GROUP_SYSID`: optional group to triage quarantines

## References
- GlideSysAttachment API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideSysAttachment/concept/c_GlideSysAttachmentAPI.html
- Business Rules  
  https://www.servicenow.com/docs/bundle/zurich-application-development/page/build/applications/concept/c_BusinessRules.html
