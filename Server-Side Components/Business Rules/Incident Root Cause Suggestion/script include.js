var IncidentRootCauseHelper = Class.create();
IncidentRootCauseHelper.prototype = {
    initialize: function() {},

    // Method to find potential root causes based on keywords
    getRootCauseSuggestions: function(description) {
        if (!description) return [];

        var suggestions = [];
        var gr = new GlideRecord('incident');
        gr.addActiveQuery(); // Only active incidents
        gr.addNotNullQuery('u_root_cause'); // Custom field storing root cause
        gr.query();

        while (gr.next()) {
            var pastDesc = gr.short_description + " " + gr.description;
            if (description.toLowerCase().indexOf(gr.short_description.toLowerCase()) != -1 ||
                description.toLowerCase().indexOf(gr.description.toLowerCase()) != -1) {
                suggestions.push(gr.u_root_cause.toString());
            }
        }

        // Remove duplicates and limit to top 5 suggestions
        suggestions = Array.from(new Set(suggestions)).slice(0, 5);

        return suggestions;
    },

    type: 'IncidentRootCauseHelper'
};
