// Virtual Agent Conversation Analytics
// Analyzes VA conversation logs to identify the most common topics

var daysBack = 7; // Analyze conversations from the past 7 days

// Calculate date range
var startDate = new GlideDateTime();
startDate.addDaysLocalTime(-daysBack);

gs.info('=== Virtual Agent Conversation Analytics ===');
gs.info('Analyzing conversations from: ' + startDate.getDisplayValue());

// Get conversation logs
var convGr = new GlideRecord('sys_cs_conversation');
convGr.addQuery('sys_created_on', '>=', startDate);
convGr.query();

var totalConversations = convGr.getRowCount();
gs.info('Total Conversations: ' + totalConversations);

// Auto-detect topic field (handles schema variations)
var topicField = convGr.isValidField('topic') ? 'topic' : 
                 (convGr.isValidField('selected_topic') ? 'selected_topic' : null);

if (!topicField) {
    gs.warn('No topic field found on sys_cs_conversation table');
} else {
    // Track topic counts
    var topicCounts = {};

    while (convGr.next()) {
        var topicId = convGr.getValue(topicField);
        
        if (topicId) {
            var topicGr = new GlideRecord('sys_cs_topic');
            if (topicGr.get(topicId)) {
                var topicName = topicGr.getValue('name');
                
                if (!topicCounts[topicName]) {
                    topicCounts[topicName] = 0;
                }
                topicCounts[topicName]++;
            }
        }
    }

    // Sort and display most common topics
    gs.info('\n=== Most Common Topics ===');
    var sortedTopics = [];
    for (var topic in topicCounts) {
        sortedTopics.push({name: topic, count: topicCounts[topic]});
    }
    sortedTopics.sort(function(a, b) { return b.count - a.count; });

    if (sortedTopics.length === 0) {
        gs.info('No topics found in the selected time range');
    } else {
        for (var i = 0; i < Math.min(10, sortedTopics.length); i++) {
            gs.info((i + 1) + '. ' + sortedTopics[i].name + ': ' + sortedTopics[i].count + ' conversations');
        }
    }
}

gs.info('\n=== Analysis Complete ===');