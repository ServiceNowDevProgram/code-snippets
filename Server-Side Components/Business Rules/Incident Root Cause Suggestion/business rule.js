(function executeRule(current, previous /*null when async*/) {

    // Only run if short_description or description changes
    if (current.short_description.changes() || current.description.changes()) {
        
        var helper = new IncidentRootCauseHelper();
        var suggestions = helper.getRootCauseSuggestions(current.short_description + " " + current.description);

        if (suggestions.length > 0) {
            // Store suggestions in a custom field (multi-line text)
            current.u_root_cause_suggestions = suggestions.join("\n");
        }
    }

})(current, previous);
