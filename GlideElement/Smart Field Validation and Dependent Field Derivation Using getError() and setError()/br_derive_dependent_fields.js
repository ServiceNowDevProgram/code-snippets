// Name: Derive Dependent Fields
// Table: Incident
// When: before insert or before update
// Order: 200

(function executeRule(current, previous /*null when async*/) {

    // Only proceed if short_description changed or new record
    if (!(current.operation() === 'insert' || current.short_description.changes())) {
        return;
    }

    var errorMsg = current.short_description.getError();

    if (errorMsg) {
        gs.info('[BR:200 - Derive] Skipping field derivation due to prior error → ' + errorMsg);
        return;
    }

    // Proceed only if no prior validation error
    var desc = current.getValue('short_description').toLowerCase();

    // Example 1: Derive category
    if (desc.includes('server')) {
        current.category = 'infrastructure';
        current.subcategory = 'server issue';
    } else if (desc.includes('email')) {
        current.category = 'communication';
        current.subcategory = 'email problem';
    } else if (desc.includes('login')) {
        current.category = 'access';
        current.subcategory = 'authentication';
    } else {
        current.category = 'inquiry';
        current.subcategory = 'general';
    }

    // Example 2: Derive impact
    if (desc.includes('critical') || desc.includes('outage')) {
        current.impact = 1; // High
    } else {
        current.impact = 3; // Low
    }

})(current, previous);
