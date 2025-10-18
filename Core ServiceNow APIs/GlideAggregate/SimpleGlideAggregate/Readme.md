SimpleGlideAggregate Utility
**Overview**
SimpleGlideAggregate is a developer utility Script Include for ServiceNow that provides a simplified, chainable API around the native GlideAggregate class. It abstracts complexities of writing aggregation queries and returns results in an easy-to-use JavaScript object format.
Because OOTB glideAggregate API is little bit different so I tried to create a new function with a simper version.
**Purpose**
Simplify aggregate queries such as COUNT, SUM, MIN, and MAX for developers, especially those less familiar with GlideAggregate methods.
Provide an intuitive interface for common aggregation operations with chaining support.
Facilitate viewing aggregate results alongside individual records matching the same criteria for better analysis.

**Sample Usage of the functions :**
 var sga = new SimpleGlideAggregate('incident');

        // Build query and add all supported aggregates
        var results = sga
            .addQuery('active', true)             // Filter: active incidents only
            .addQuery('priority', '>=', 2)        // Priority 2 or higher
            .count()                             // Count matching records
            .sum('duration')                    // Sum of duration field instead of impact
            .min('priority')                     // Minimum priority value in results
            .max('sys_updated_on')               // Most recent update timestamp
            .execute();

        gs.info('Aggregate Results:');
        gs.info('Count: ' + results.COUNT);
        gs.info('Sum of Duration: ' + (results.SUM_duration !== undefined ? results.SUM_duration : 'N/A'));
        gs.info('Minimum Priority: ' + (results.MIN_priority !== undefined ? results.MIN_priority : 'N/A'));
        gs.info('Most Recent Update (max sys_updated_on timestamp): ' + (results.MAX_sys_updated_on !== undefined ? results.MAX_sys_updated_on : 'N/A'));

        // Optionally fetch some matching record details to complement the aggregate data
        var gr = new GlideRecord('incident');
        gr.addQuery('active', true);
        gr.addQuery('priority', '>=', 2);
        gr.orderByDesc('sys_updated_on');
        gr.setLimit(5);
        gr.query();

        gs.info('Sample Matching Incidents:');
        while (gr.next()) {
            gs.info('Number: ' + gr.getValue('number') + ', Priority: ' + gr.getValue('priority') + ', Updated: ' + gr.getValue('sys_updated_on'));
        }
