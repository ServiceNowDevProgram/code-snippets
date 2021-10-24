var gldAgg = new GlideAggregate('sn_grc_issue');

// Restrict returned data-set to records created within the current year to date
gldAgg.addQuery('sys_created_on', '>=', 'javascript:gs.beginningOfThisYear()');

// Will group returned query data-set by rule
// Example: Will group returned data-set by assigned_to & use that grouping to caluclate COUNT using grouping
gldAgg.addAggregate('COUNT', 'assigned_to');
gldAgg.query();

while (gldAgg.next()) {
    // Retrieve group calculated values
    var recordCount = gldAgg.getAggregate('COUNT', 'assigned_to');

    // Retrieve value from group
    var assignedTo = gldAgg.getDisplayValue('assigned_to');

    if (assignedTo == "") {
        assignedTo = '[Empty]';
    }

    gs.info('There were {0} issues assigned to {1} as of this year', [recordCount, assignedTo]);
}