(function executeRule(current, previous /*null when async*/ ) {
    // This Business Rule runs 'before' a record is deleted from the 'sn_compliance_policy' table.
    // Its purpose is to prevent a policy from being deleted if it is currently linked to any active controls.
    // This helps maintain data integrity and prevents the creation of orphaned or invalidated compliance records.

 
    // 'sn_compliance_m2m_policy_policy_statement'. This table links policies (via the 'document' field)
    // to control statements (via the 'content' field). Using GlideAggregate is more
    // performant than GlideRecord for counting records, as it performs the aggregation
    // directly in the database.
    var grControlAggregate = new GlideAggregate('sn_compliance_m2m_policy_policy_statement');
    
    // Add a query to filter for records in the m2m table where the 'document' field matches
    // the sys_id of the policy record currently being deleted.
    grControlAggregate.addQuery('document', current.getUniqueValue());
    
    // Add a second query using 'dot-walking' to filter for records where the related
    // control statement ('content' field) is currently active. This ensures only active
    // controls are considered.
    grControlAggregate.addQuery('content.active', true);
    
    // Set the aggregate function to COUNT. This tells the database to return the total
    // number of records that match the query conditions.
    grControlAggregate.addAggregate('COUNT');
    
    // Execute the database query.
    grControlAggregate.query();

    // Initialize a variable to store the count of active controls.
    var activeControlCount = 0;
    
    // Check if the query returned any results. If it did, retrieve the count.
    // Note: GlideAggregate.next() returns a row even if the count is zero.
    if (grControlAggregate.next()) {
        // Retrieve the aggregated count result and assign it to the variable.
        activeControlCount = grControlAggregate.getAggregate('COUNT');
    }

    // Check if the count of active controls is greater than zero.
    if (activeControlCount > 0) {
        // If active controls were found, add an error message to display to the user.
        // The message includes the count for better clarity.
        gs.addErrorMessage('Cannot delete this policy because it has ' + activeControlCount + ' active controls linked to it.');
        
        // This crucial line aborts the current database transaction (the delete operation).
        // It prevents the policy record from being deleted.
        current.setAbortAction(true);
    }

})(current, previous);
