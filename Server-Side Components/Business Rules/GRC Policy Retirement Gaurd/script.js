(function executeRule(current, previous /*null when async*/ ) {
    // This Business Rule runs 'before' a record is updated on the 'sn_compliance_policy' table.
    // Its purpose is to prevent a policy from being retired if it is currently linked to any active Control Objective.
    // This enforces a proper decommissioning process, ensuring that Control Objective are delinked.
    // before the policy that governs them, thereby preventing compliance gaps.
    // The condition for this rule would be: 'State' changes to 'Retired'.

    // Instantiate a GlideAggregate object on the many-to-many (m2m) table
    // 'sn_compliance_m2m_policy_policy_statement'. This table links policies (via the 'document' field)
    // to control statements (via the 'content' field). Using GlideAggregate is more
    // performant than GlideRecord for counting records, as it performs the aggregation
    // directly in the database.
    var grControlAggregate = new GlideAggregate('sn_compliance_m2m_policy_policy_statement');
    
    // Add a query to filter for records in the m2m table where the 'document' field matches
    // the sys_id of the policy record currently being retired.
    grControlAggregate.addQuery('document', current.getUniqueValue());
    
    // Add a second query using 'dot-walking' to filter for records where the related
    // control statement ('content' field) is currently active. This ensures only active
    // Control Objective are considered.
    grControlAggregate.addQuery('content.active', true);
    
    // Set the aggregate function to COUNT. This tells the database to return the total
    // number of records that match the query conditions.
    grControlAggregate.addAggregate('COUNT');
    
    // Execute the database query.
    grControlAggregate.query();

    // Initialize a variable to store the count of active Control Objective.
    var activeControlCount = 0;
    
    // Check if the query returned any results. If it did, retrieve the count.
    // Note: GlideAggregate.next() returns a row even if the count is zero.
    if (grControlAggregate.next()) {
        // Retrieve the aggregated count result and assign it to the variable.
        activeControlCount = grControlAggregate.getAggregate('COUNT');
    }

    // Check if the count of active Control Objective is greater than zero.
    if (activeControlCount > 0) {
        // If active Control Objective were found, add an error message to display to the user.
        // The message includes the count for better clarity.
        gs.addErrorMessage('Cannot retire this policy because it has ' + activeControlCount + ' active Control Objective linked to it. All Control Objective must be delinked first.');
        
        // This crucial line aborts the current database transaction (the update operation).
        // It prevents the policy record from being marked as 'Retired'.
        current.setAbortAction(true);
    }

})(current, previous);
