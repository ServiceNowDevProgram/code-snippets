/**
 * Script Name: Bulk Incident Priority Updater
 * Description: 
 * This script automates the bulk update of incident priorities based on predefined category mappings.
 * It iterates through all active incidents, checks their category, 
 * and updates the priority field accordingly using the mapping defined below.

 * Table: incident
 * Type: Background Script
 * Author: Sachin Narayanasamy
 **/

(function() {
    var priorityMapping = {
        'network': 1,       // Critical
        'application': 2,   // High
        'hardware': 3       // Moderate
    };

    var updatedCount = 0;
    var skippedCount = 0;

    var incidentGR = new GlideRecord('incident');
    incidentGR.addQuery('active', true);
    incidentGR.query();

    while (incidentGR.next()) {
        var category = incidentGR.category.toString();
        var newPriority = priorityMapping[category];

        if (newPriority && incidentGR.priority != newPriority) {
            incidentGR.priority = newPriority;
            incidentGR.update();
            updatedCount++;
            gs.info('Updated Incident: ' + incidentGR.number + ' → Priority set to: ' + newPriority);
        } else {
            skippedCount++;
        }
    }

    gs.info('Bulk Priority Update completed. Updated: ' + updatedCount + ', Skipped: ' + skippedCount);
})();

