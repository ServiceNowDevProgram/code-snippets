(function() {
    var keywordCategoryMap = {
        'network': 'Network Issues',
        'server': 'Server Issues',
        'database': 'Database Issues',
        'application': 'Application Issues',
        'login': 'User Access Issues',
        'password': 'User Access Issues',
        'error': 'General Errors',
        'crash': 'Application Issues',
        'slow': 'Performance Issues',
    };

    function categorizeIncident(shortDescription, description) {
        var combinedText = (shortDescription + ' ' + description).toLowerCase();

        for (var keyword in keywordCategoryMap) {
            if (combinedText.indexOf(keyword) !== -1) {
                return keywordCategoryMap[keyword]; 
            }
        }
        return 'Uncategorized'; 

    if (current.operation() === 'insert') {
        var category = categorizeIncident(current.short_description, current.description);
        current.category = category; 
        current.update();

        gs.info('Incident ' + current.number + ' categorized as: ' + category);
    }
})();
