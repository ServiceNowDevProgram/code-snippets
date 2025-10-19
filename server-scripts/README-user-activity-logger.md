# User Activity Logger

A ServiceNow server-side script to log user activity with timestamps and session details.

## Description

This script creates an audit log entry whenever called, recording the current user's information, session ID, and timestamp. Useful for tracking user activities across the platform.

## Features

- ✅ Captures current user information
- ✅ Logs session ID for tracking
- ✅ Creates audit trail records
- ✅ Error handling included
- ✅ Easy to integrate into Business Rules or Scheduled Jobs

## Usage

### In Business Rules

```javascript
// When: before insert
// Table: incident
// Script:
(function executeRule(current, previous /*null when async*/) {
    // Call the activity logger
    userActivityLogger();
})(current, previous);
```

### In Scheduled Jobs

```javascript
// Run this as a scheduled job to periodically log user sessions
userActivityLogger();
```

## Author

**Ashvin**
- GitHub: [@ashvin2005](https://github.com/ashvin2005)
- LinkedIn: [ashvin-tiwari](https://linkedin.com/in/ashvin-tiwari)

## Category

Server Scripts / Business Rules

## Hacktoberfest 2025

Created for ServiceNow Hacktoberfest 2025 🎃

## License

MIT License