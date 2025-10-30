// Script Include: MLPredictionClient
// Calls external ML API to get incident predictions

var MLPredictionClient = Class.create();
MLPredictionClient.prototype = {
    initialize: function() {
        this.ML_API_URL = 'https://your-ml-api.com/predict';
        this.API_KEY = 'your-api-key-here';
    },
    
    predictIncident: function(incidentData) {
        try {
            var request = new RESTMessageV2();
            request.setEndpoint(this.ML_API_URL);
            request.setHttpMethod('POST');
            request.setRequestHeader('Authorization', 'Bearer ' + this.API_KEY);
            request.setRequestHeader('Content-Type', 'application/json');
            
            // Send incident details to ML API
            var payload = {
                description: incidentData.description,
                category: incidentData.category,
                priority: incidentData.priority
            };
            request.setRequestBody(JSON.stringify(payload));
            
            // Get prediction from external ML service
            var response = request.execute();
            var result = JSON.parse(response.getBody());
            
            return {
                estimated_hours: result.estimated_hours,
                predicted_category: result.category,
                confidence: result.confidence
            };
        } catch (error) {
            gs.log('ML API Error: ' + error, 'MLPredictionClient');
            return null;
        }
    },
    
    type: 'MLPredictionClient'
};
