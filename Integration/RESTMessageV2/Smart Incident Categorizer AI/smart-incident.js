// Business Rule: Smart Incident Categorizer AI
// Table: incident
// When: before, insert
// Filter Conditions: Category is empty

(function executeRule(current, previous) {
    if (current.isNewRecord() && !current.category) {
        var categorizer = new SmartIncidentCategorizer();
        var suggestedCategory = categorizer.categorizeIncident(current.short_description + ' ' + current.description);
        
        if (suggestedCategory) {
            current.category = suggestedCategory;
            current.work_notes = 'Category auto-assigned by AI: ' + suggestedCategory;
        }
    }
})(current, previous);

var SmartIncidentCategorizer = Class.create();
SmartIncidentCategorizer.prototype = {
    categorizeIncident: function(description) {
        try {
            var openai = new sn_ws.RESTMessageV2();
            openai.setHttpMethod('POST');
            openai.setEndpoint('https://api.openai.com/v1/chat/completions');
            openai.setRequestHeader('Authorization', 'Bearer ' + gs.getProperty('openai.api.key'));
            openai.setRequestHeader('Content-Type', 'application/json');

            var payload = {
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are an IT service desk categorizer. Return only one of these categories: network, hardware, software, database, security, email"
                }, {
                    role: "user", 
                    content: "Categorize this incident: " + description
                }],
                max_tokens: 10,
                temperature: 0.1
            };

            openai.setRequestBody(JSON.stringify(payload));
            var response = openai.execute();
            
            if (response.getStatusCode() == 200) {
                var result = JSON.parse(response.getBody());
                return result.choices[0].message.content.trim().toLowerCase();
            }
        } catch (e) {
            gs.error('AI Categorizer Error: ' + e.message);
        }
        return null;
    }
};
