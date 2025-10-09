# Incident Count

## Description
This snippet demonstrates how to count the total number of incident records in ServiceNow using the GlideRecord API.

## Usage
This code can be run in:
- Background Scripts
- Script Includes
- Business Rules
- Scheduled Jobs

## Code Example
```javascript
var gr = new GlideRecord('incident');
gr.query();
var count = gr.getRowCount();
gs.info('Total number of incidents: ' + count);
```

## API Used
- GlideRecord - Core ServiceNow API for database operations
- getRowCount() - Returns the number of rows in the query result

## Notes
- This snippet uses getRowCount() which is efficient for counting records
- The query() method must be called before getRowCount()
- You can add encoded queries before calling query() to count specific records

## Related
- [GlideRecord Documentation](https://developer.servicenow.com/dev.do#!/reference/api/latest/server/no-namespace/c_GlideRecordScopedAPI)

## Tags
#GlideRecord #Incidents #Count #ServerSide
