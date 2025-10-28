// Script Include: MLDataExporter
// Purpose: Query incident data for ML pipeline consumption
// Usage: var exporter = new MLDataExporter(); var data = exporter.getIncidentData(limit);

var MLDataExporter = Class.create();
MLDataExporter.prototype = {
    initialize: function() {},
    
    // Extract incident records suitable for ML training
    getIncidentData: function(limit) {
        limit = limit || 100;
        var incidents = [];
        
        // Query incidents from database
        var gr = new GlideRecord('incident');
        gr.addQuery('active', 'true');
        gr.addQuery('state', '!=', ''); // exclude blank states
        gr.setLimit(limit);
        gr.query();
        
        while (gr.next()) {
            // Extract fields relevant for ML analysis
            incidents.push({
                id: gr.getValue('sys_id'),
                description: gr.getValue('description'),
                short_description: gr.getValue('short_description'),
                category: gr.getValue('category'),
                priority: gr.getValue('priority'),
                impact: gr.getValue('impact'),
                urgency: gr.getValue('urgency'),
                state: gr.getValue('state'),
                created_on: gr.getValue('sys_created_on'),
                resolution_time: this._calculateResolutionTime(gr)
            });
        }
        
        return incidents;
    },
    
    // Calculate resolution time in hours (useful ML feature)
    _calculateResolutionTime: function(gr) {
        var created = new GlideDateTime(gr.getValue('sys_created_on'));
        var resolved = new GlideDateTime(gr.getValue('sys_updated_on'));
        var diff = GlideDateTime.subtract(created, resolved);
        return Math.abs(diff / (1000 * 60 * 60)); // convert to hours
    },
    
    type: 'MLDataExporter'
};
