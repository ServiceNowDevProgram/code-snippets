// Name: Validate Short Description
// Table: Incident
// When: before insert or before update
// Order: 100

(function executeRule(current, previous /*null when async*/) {
    var short_desc = current.getValue('short_description');

    // Validate only for new records or when field changes
    if (current.operation() === 'insert' || current.short_description.changes()) {
        if (!short_desc || short_desc.trim().length < 40) {
            current.short_description.setError('Short description must be at least 40 characters long.');
            current.setAbortAction(true);
        }
    }
})(current, previous);
