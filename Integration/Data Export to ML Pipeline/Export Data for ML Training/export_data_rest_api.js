// Scripted REST API Resource: ML Data Export
// Base Path: /api/ml_export
// Resource Path: /incidents
// HTTP Method: GET
// Parameters: ?limit=100&offset=0

(function process(request, response) {
    try {
        // Get query parameters
        var limit = request.getParameter('limit') || 100;
        var offset = request.getParameter('offset') || 0;
        
        // Use the Script Include to fetch data
        var exporter = new MLDataExporter();
        var incidents = exporter.getIncidentData(limit);
        
        // Prepare response with metadata
        var result = {
            status: 'success',
            count: incidents.length,
            data: incidents,
            timestamp: new GlideDateTime().toString()
        };
        
        response.setContentType('application/json');
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify(result));
        
    } catch (error) {
        // Error handling for ML pipeline
        response.setStatus(500);
        response.setContentType('application/json');
        var error_response = {
            status: 'error',
            message: error.toString(),
            timestamp: new GlideDateTime().toString()
        };
        response.getStreamWriter().writeString(JSON.stringify(error_response));
        gs.log('ML Export API Error: ' + error.toString(), 'MLDataExport');
    }
})(request, response);
