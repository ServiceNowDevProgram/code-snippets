// Virtual Agent Topic Coverage Report
// Analyzes VA topic configuration health and usage patterns

var daysBack = 30; // Analyze topic usage from the past 30 days

// Calculate date range for usage analysis
var startDate = new GlideDateTime();
startDate.addDaysLocalTime(-daysBack);

gs.info('=== Virtual Agent Topic Coverage Report ===');
gs.info('Analyzing topics and usage from: ' + startDate.getDisplayValue());

// Get all VA topics
var topicGr = new GlideRecord('sys_cs_topic');
if (!topicGr.isValid()) {
    gs.warn('Table sys_cs_topic not found. Virtual Agent may not be installed.');
} else {
    topicGr.query();
    
    var totalTopics = topicGr.getRowCount();
    gs.info('Total Topics: ' + totalTopics);
    
    var inactiveTopics = [];
    var unpublishedTopics = [];
    var zeroUsageTopics = [];
    var topicUsage = {};
    
    // Auto-detect conversation table field name
    var convGr = new GlideRecord('sys_cs_conversation');
    var topicField = null;
    if (convGr.isValid()) {
        topicField = convGr.isValidField('topic') ? 'topic' : 
                     (convGr.isValidField('selected_topic') ? 'selected_topic' : null);
    }
    
    while (topicGr.next()) {
        var topicId = topicGr.getUniqueValue();
        var topicName = topicGr.getValue('name');
        var isActive = topicGr.getValue('active') == 'true' || topicGr.getValue('active') == '1';
        var isPublished = topicGr.getValue('published') == 'true' || topicGr.getValue('published') == '1';
        
        // Track inactive topics
        if (!isActive) {
            inactiveTopics.push(topicName);
        }
        
        // Track unpublished topics
        if (!isPublished) {
            unpublishedTopics.push(topicName);
        }
        
        // Count conversations for this topic (if conversation table exists)
        var conversationCount = 0;
        if (topicField) {
            var convCountGr = new GlideAggregate('sys_cs_conversation');
            convCountGr.addQuery(topicField, topicId);
            convCountGr.addQuery('sys_created_on', '>=', startDate);
            convCountGr.addAggregate('COUNT');
            convCountGr.query();
            if (convCountGr.next()) {
                conversationCount = parseInt(convCountGr.getAggregate('COUNT')) || 0;
            }
        }
        
        topicUsage[topicName] = conversationCount;
        
        // Track topics with zero usage
        if (isActive && isPublished && conversationCount === 0) {
            zeroUsageTopics.push(topicName);
        }
    }
    
    // Display results
    gs.info('\n=== Inactive Topics ===');
    if (inactiveTopics.length > 0) {
        for (var i = 0; i < inactiveTopics.length; i++) {
            gs.info((i + 1) + '. ' + inactiveTopics[i]);
        }
    } else {
        gs.info('No inactive topics found');
    }
    
    gs.info('\n=== Unpublished Topics ===');
    if (unpublishedTopics.length > 0) {
        for (var j = 0; j < unpublishedTopics.length; j++) {
            gs.info((j + 1) + '. ' + unpublishedTopics[j]);
        }
    } else {
        gs.info('No unpublished topics found');
    }
    
    gs.info('\n=== Topics with Zero Usage (Active & Published) ===');
    if (zeroUsageTopics.length > 0) {
        for (var k = 0; k < zeroUsageTopics.length; k++) {
            gs.info((k + 1) + '. ' + zeroUsageTopics[k]);
        }
    } else {
        if (topicField) {
            gs.info('All active & published topics have been used');
        } else {
            gs.info('Cannot analyze usage - conversation table not available');
        }
    }
}

gs.info('\n=== Analysis Complete ===');
