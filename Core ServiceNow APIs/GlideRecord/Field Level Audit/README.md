# GlideRecord Field-Level Audit

## Description
This snippet compares two GlideRecord objects field by field and logs all differences.  
It is useful for debugging, auditing updates, or validating changes in Business Rules, Script Includes, or Background Scripts.

## Prerequisites
- Server-side context (Background Script, Business Rule, Script Include)
- Two GlideRecord objects representing the original and updated records
- Access to the table(s) involved

## Note
- Works in Global Scope
- Server-side execution only
- Logs all fields with differences to system logs
- Does not modify any records
## Usage
```javascript
// Load original record
var oldRec = new GlideRecord('incident');
oldRec.get('sys_id_here');

// Load updated record
var newRec = new GlideRecord('incident');
newRec.get('sys_id_here');

// Compare and log differences
fieldLevelAudit(oldRec, newRec);
```

## Output
```
Field changed: priority | Old: 5 | New: 2
Field changed: state    | Old: 1 | New: 3
Field changed: short_description | Old: 'Old description' | New: 'New description'
```