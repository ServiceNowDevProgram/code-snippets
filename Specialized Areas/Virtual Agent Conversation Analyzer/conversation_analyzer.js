// ========================================
// VA Conversation Analyzer - Background Script
// ========================================
// Purpose: On-demand analysis of Virtual Agent conversations
// Usage: Run from Scripts - Background when you need immediate insights
// Output: Detailed analytics report in system logs
// ========================================

(function analyzeConversations() {
    
    // Configuration
    var config = {
        daysToAnalyze: 30,  // Analyze last 30 days
        includeAbandoned: true,
        includeCompleted: true,
        minConversations: 5  // Minimum conversations to show in report
    };
    
    gs.info('=== VA Conversation Analysis Report ===');
    gs.info('Analyzing conversations from last ' + config.daysToAnalyze + ' days');
    gs.info('');
    
    // Get all conversations in time range
    var conversations = new GlideRecord('sys_cs_conversation');
    conversations.addEncodedQuery('sys_created_on>=javascript:gs.daysAgoStart(' + config.daysToAnalyze + ')');
    conversations.query();
    
    var totalConversations = conversations.getRowCount();
    gs.info('Total Conversations: ' + totalConversations);
    
    if (totalConversations == 0) {
        gs.info('No conversations found in the specified time period');
        return;
    }
    
    // Analytics collections
    var topicStats = {};
    var userStats = {};
    var departmentStats = {};
    var timeStats = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    var abandonmentReasons = {};
    var totalAbandoned = 0;
    var totalCompleted = 0;
    
    // Process each conversation
    conversations.query();
    while (conversations.next()) {
        var topicId = conversations.getValue('topic');
        var topicName = conversations.topic.getDisplayValue() || 'Unknown Topic';
        var userId = conversations.getValue('user');
        var state = conversations.getValue('state');
        var timestamp = conversations.getValue('sys_created_on');
        
        // Topic statistics
        if (!topicStats[topicName]) {
            topicStats[topicName] = {
                total: 0,
                abandoned: 0,
                completed: 0,
                users: {}
            };
        }
        topicStats[topicName].total++;
        topicStats[topicName].users[userId] = true;
        
        if (state == 'abandoned') {
            topicStats[topicName].abandoned++;
            totalAbandoned++;
        } else if (state == 'complete') {
            topicStats[topicName].completed++;
            totalCompleted++;
        }
        
        // User statistics
        if (!userStats[userId]) {
            userStats[userId] = 0;
        }
        userStats[userId]++;
        
        // Department statistics
        var department = getUserDepartment(userId);
        if (!departmentStats[department]) {
            departmentStats[department] = 0;
        }
        departmentStats[department]++;
        
        // Time of day statistics
        var timeSegment = getTimeSegment(timestamp);
        timeStats[timeSegment]++;
    }
    
    // Print Topic Statistics
    gs.info('');
    gs.info('=== Topic Statistics ===');
    gs.info('');
    
    var topicArray = [];
    for (var topic in topicStats) {
        var stats = topicStats[topic];
        topicArray.push({
            name: topic,
            total: stats.total,
            abandoned: stats.abandoned,
            completed: stats.completed,
            uniqueUsers: Object.keys(stats.users).length,
            abandonRate: ((stats.abandoned / stats.total) * 100).toFixed(1)
        });
    }
    
    // Sort by total conversations
    topicArray.sort(function(a, b) {
        return b.total - a.total;
    });
    
    // Print top topics
    gs.info('Top Topics by Conversation Count:');
    gs.info('-----------------------------------');
    topicArray.forEach(function(topic) {
        if (topic.total >= config.minConversations) {
            gs.info(topic.name);
            gs.info('  Total: ' + topic.total + 
                   ' | Completed: ' + topic.completed + 
                   ' | Abandoned: ' + topic.abandoned + 
                   ' | Abandon Rate: ' + topic.abandonRate + '%' +
                   ' | Unique Users: ' + topic.uniqueUsers);
        }
    });
    
    // Print topics with high abandonment
    gs.info('');
    gs.info('Topics with High Abandonment (>30%):');
    gs.info('-------------------------------------');
    var highAbandonmentFound = false;
    topicArray.forEach(function(topic) {
        if (parseFloat(topic.abandonRate) > 30 && topic.total >= config.minConversations) {
            gs.info('⚠️ ' + topic.name + ' - ' + topic.abandonRate + '% abandonment (' + topic.abandoned + '/' + topic.total + ')');
            highAbandonmentFound = true;
        }
    });
    if (!highAbandonmentFound) {
        gs.info('None - all topics performing well!');
    }
    
    // Print Department Statistics
    gs.info('');
    gs.info('=== Department Statistics ===');
    gs.info('');
    
    var deptArray = [];
    for (var dept in departmentStats) {
        deptArray.push({
            name: dept,
            count: departmentStats[dept]
        });
    }
    
    deptArray.sort(function(a, b) {
        return b.count - a.count;
    });
    
    deptArray.forEach(function(dept) {
        var percentage = ((dept.count / totalConversations) * 100).toFixed(1);
        gs.info(dept.name + ': ' + dept.count + ' conversations (' + percentage + '%)');
    });
    
    // Print Time of Day Statistics
    gs.info('');
    gs.info('=== Time of Day Statistics ===');
    gs.info('');
    gs.info('Morning (6am-12pm): ' + timeStats.morning + ' (' + ((timeStats.morning / totalConversations) * 100).toFixed(1) + '%)');
    gs.info('Afternoon (12pm-5pm): ' + timeStats.afternoon + ' (' + ((timeStats.afternoon / totalConversations) * 100).toFixed(1) + '%)');
    gs.info('Evening (5pm-10pm): ' + timeStats.evening + ' (' + ((timeStats.evening / totalConversations) * 100).toFixed(1) + '%)');
    gs.info('Night (10pm-6am): ' + timeStats.night + ' (' + ((timeStats.night / totalConversations) * 100).toFixed(1) + '%)');
    
    // Print User Engagement Statistics
    gs.info('');
    gs.info('=== User Engagement Statistics ===');
    gs.info('');
    
    var totalUsers = Object.keys(userStats).length;
    var powerUsers = 0;
    var casualUsers = 0;
    
    for (var user in userStats) {
        if (userStats[user] >= 5) {
            powerUsers++;
        } else {
            casualUsers++;
        }
    }
    
    gs.info('Total Unique Users: ' + totalUsers);
    gs.info('Power Users (5+ conversations): ' + powerUsers);
    gs.info('Casual Users (<5 conversations): ' + casualUsers);
    gs.info('Average Conversations per User: ' + (totalConversations / totalUsers).toFixed(1));
    
    // Print Overall Statistics
    gs.info('');
    gs.info('=== Overall Statistics ===');
    gs.info('');
    gs.info('Total Conversations: ' + totalConversations);
    gs.info('Completed: ' + totalCompleted + ' (' + ((totalCompleted / totalConversations) * 100).toFixed(1) + '%)');
    gs.info('Abandoned: ' + totalAbandoned + ' (' + ((totalAbandoned / totalConversations) * 100).toFixed(1) + '%)');
    gs.info('Average Daily Conversations: ' + (totalConversations / config.daysToAnalyze).toFixed(1));
    
    // Recommendations
    gs.info('');
    gs.info('=== Recommendations ===');
    gs.info('');
    
    var highAbandonTopics = topicArray.filter(function(t) {
        return parseFloat(t.abandonRate) > 30 && t.total >= config.minConversations;
    });
    
    if (highAbandonTopics.length > 0) {
        gs.info('🔍 Review ' + highAbandonTopics.length + ' topic(s) with high abandonment rates');
    }
    
    if (timeStats.night > (totalConversations * 0.1)) {
        gs.info('🌙 Significant night-time usage detected (' + timeStats.night + ' conversations) - consider 24/7 support topics');
    }
    
    if (totalUsers > 0 && (totalConversations / totalUsers) < 2) {
        gs.info('📢 Low engagement (avg ' + (totalConversations / totalUsers).toFixed(1) + ' conversations/user) - consider promoting VA to increase awareness');
    }
    
    if ((totalCompleted / totalConversations) > 0.85) {
        gs.info('✅ High completion rate (' + ((totalCompleted / totalConversations) * 100).toFixed(1) + '%) - VA is performing well!');
    }
    
    gs.info('');
    gs.info('=== Analysis Complete ===');
    
    // Helper functions
    function getUserDepartment(userId) {
        var user = new GlideRecord('sys_user');
        if (user.get(userId)) {
            return user.getDisplayValue('department') || 'Unknown';
        }
        return 'Unknown';
    }
    
    function getTimeSegment(timestamp) {
        var dt = new GlideDateTime(timestamp);
        var timeStr = dt.getDisplayValue();
        var hour = parseInt(timeStr.split(' ')[1].split(':')[0]);
        
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 22) return 'evening';
        return 'night';
    }
    
})();
