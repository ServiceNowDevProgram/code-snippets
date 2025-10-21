# User Impersonation Activity Logger

A ServiceNow server-side utility that automatically creates a log when an action is performed under impersonation, helping distinguish between admin-added and user-added notes.

# Challenge

The challenge lies in distinguishing between actions performed by administrators impersonating users and those performed by the users themselves. Without a reliable way to track impersonation activity, it becomes difficult to ensure transparency and accountability in ticket histories. This lack of clarity can lead to confusion during audits, misinterpretation of updates, and potential compliance risks. Addressing this issue is critical to maintaining trust and operational efficiency.

## Description

This script identifies if the current user session is under impersonation (e.g., an admin impersonating another user).  
If true, it automatically appends a message in the **Logs** indicating that the note was added during impersonation.  
This improves auditability and clarity when reviewing ticket histories.

## Functionality

The User Impersonation Activity Logger provides the following capabilities:
- Detects if the current user is impersonating another user
- Automatically appends a log message stating the impersonation context
- Works in **Business Rule** and Global Scoped Tables
- Logs both actual user and impersonated user details
- Provides clear distinction for audit and tracking

## Usage Instructions

### Add as Business Rule

```javascript
// When: before update
// Table: incident 
// Script:
(function executeRule(current, previous /*null when async*/) {
  if (new GlideImpersonate().isImpersonating()) { // Check if the user is impersonating
    if (current.comments.changes() || current.work_notes.changes()) { // Check if comments or work notes have changed
      let actualUserName = gs.getImpersonatingUserDisplayName();
      let impersonatedUserName = gs.getUserDisplayName();
        let logMessage = `User Impersonation Activity Detected:
        Timestamp : ${ new GlideDateTime()}
        Actual User: ${actualUserName}
        Impersonated User: ${impersonatedUserName}
        Comments added: ${current.comments || 'NA'}
        Work Notes added: ${current.work_notes || 'NA'}`;
        gs.info(logMessage);
    }
  }
})(current, previous);
```


## Prerequisites

- Need admin access to check the impersonation logs later


## Dependencies

- GlideSystem API
- GlideImpersonate API
- gs.getSession()
- GlideDateTime() API


## Category

Server-Side Components / Business Rules / User Impersonation Activity Logger

## Hacktoberfest 2025

Created as first Contribution for ServiceNow Hacktoberfest 2025 🎃

## License

MIT License
