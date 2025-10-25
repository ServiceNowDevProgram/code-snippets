# GlideRecord Bulk Delete with Safety Checks

## Description
This snippet allows you to safely delete multiple records from a ServiceNow table based on an encoded query.
It logs all records that match the query so you can review them before actually deleting anything.  
Helps prevent accidental mass deletion of important data.

## Note 
- Works in Global Scope by default
- Can be executed in Background Scripts or Script Includes
- **ALWAYS REVIEW LOGS BEFORE ENABLING DELETION**
## Prerequisites
- Server-side context (Background Script, Business Rule, Script Include)
- Access to the target table
- Basic understanding of GlideRecord and Encoded Queries

## Usage
```javascript
// Logs all active low-priority incidents that would be deleted
safeDelete('incident', 'active=true^priority=5');

// To perform actual deletion, uncomment gr.deleteRecord() inside the function
```

## Output
```
Records matching query: 3
Record sys_id: 12345abcdef would be deleted.
Record sys_id: 23456bcdef would be deleted.
Record sys_id: 34567cdefg would be deleted.
Bulk delete preview complete. Verify logs before enabling deletion.
```
