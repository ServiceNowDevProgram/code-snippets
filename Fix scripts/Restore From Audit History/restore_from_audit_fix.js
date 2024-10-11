/*************
Pre-requisite
Make Sure columns of sys_audit table - (tablename, fieldname & documentkey) are indexed for better query result.
**************/
function getAuditHistoryData(id, field, table) {
    // Create a new GlideRecord object for the 'sys_audit' table
    var grSysAudit = new GlideRecord('sys_audit');
    
    // Add query conditions to filter by table name, field name, and document key (record ID)
    grSysAudit.addEncodedQuery("tablename=" + table + "^fieldname=" + field + "^documentkey=" + id);
    
    // Order the results by the creation date in descending order
    grSysAudit.orderByDesc('sys_created_on');
    
    // Limit the results to the most recent entry
    grSysAudit.setLimit(1);
    
    // Execute the query
    grSysAudit.query();
    
    // Iterate through the results (should only be one due to limit)
    while (grSysAudit.next()) {
        // Return the old value of the field from the audit record
        return grSysAudit.getValue('oldvalue');
    }
}

/*************
Example Script to Invoke the Function and Update the Record
Scenario: Revert the incident state to its previous value after it was mistakenly marked as canceled.
**************/

var grIncident = new GlideRecord('incident');
if (grIncident.get('<incident_sys_id>')) {
  grIncident.state = getAuditHistoryData('incident_sys_id', 'state', 'incident');
}

/****************
Generic Script
****************/
var tableName= '<your_table_name>';
var recordSysId = '<record_sys_id>';
var field = 'field_name';
var grIncident = new GlideRecord(tableName);
if (grIncident.get(recordSysId)) {
  grIncident[field] = getAuditHistoryData(recordSysId, field, tableName);
}
