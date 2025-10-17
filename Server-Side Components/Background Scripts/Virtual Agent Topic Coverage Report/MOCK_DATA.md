# Mock Data Seeder for VA Topic Coverage Report

Use this script to create test data for the Virtual Agent Topic Coverage Report.

## Mock Data Script

Run this in **System Definition → Scripts - Background** to create test topics:

```javascript
// Generate mock VA topics for testing Topic Coverage Report
// Creates topics with various states (active/inactive, published/unpublished)

(function() {
    var TEST_TOPICS = [
        {name: 'Password Reset Help', active: true, published: true, hasConversations: true, count: 15},
        {name: 'VPN Access Request', active: true, published: true, hasConversations: true, count: 8},
        {name: 'Laptop Request', active: true, published: true, hasConversations: false, count: 0},
        {name: 'Printer Support', active: true, published: false, hasConversations: false, count: 0},
        {name: 'Email Issues', active: false, published: true, hasConversations: false, count: 0},
        {name: 'Test Topic Draft', active: false, published: false, hasConversations: false, count: 0}
    ];
    
    var topicGr = new GlideRecord('sys_cs_topic');
    if (!topicGr.isValid()) {
        gs.error('Table sys_cs_topic not found. Virtual Agent may not be installed.');
        return;
    }
    
    // Auto-detect conversation field
    var convGr = new GlideRecord('sys_cs_conversation');
    var topicField = null;
    if (convGr.isValid()) {
        topicField = convGr.isValidField('topic') ? 'topic' : 
                     (convGr.isValidField('selected_topic') ? 'selected_topic' : null);
    }
    
    gs.info('Creating ' + TEST_TOPICS.length + ' test VA topics...');
    
    for (var i = 0; i < TEST_TOPICS.length; i++) {
        var topic = TEST_TOPICS[i];
        
        // Check if topic already exists
        topicGr.initialize();
        topicGr.addQuery('name', topic.name);
        topicGr.setLimit(1);
        topicGr.query();
        
        var topicId;
        if (topicGr.next()) {
            topicId = topicGr.getUniqueValue();
            gs.info('Topic already exists: ' + topic.name);
        } else {
            // Create new topic
            topicGr.initialize();
            topicGr.setValue('name', topic.name);
            if (topicGr.isValidField('short_description')) {
                topicGr.setValue('short_description', 'Test topic for coverage report');
            }
            topicGr.setValue('active', topic.active);
            topicGr.setValue('published', topic.published);
            topicId = topicGr.insert();
            gs.info('Created topic: ' + topic.name + ' (active: ' + topic.active + ', published: ' + topic.published + ')');
        }
        
        // Create conversations if needed
        if (topic.hasConversations && topicField && topicId) {
            for (var j = 0; j < topic.count; j++) {
                convGr.initialize();
                convGr.setValue(topicField, topicId);
                if (convGr.isValidField('state')) convGr.setValue('state', 2); // closed
                convGr.insert();
            }
            gs.info('  Created ' + topic.count + ' conversations for: ' + topic.name);
        }
    }
    
    gs.info('\n=== Mock Data Complete ===');
    gs.info('Run the Virtual Agent Topic Coverage Report to see results!');
})();
```

## Expected Output

After running the mock data seeder, your coverage report should show:

- **Total Topics**: 6
- **Inactive Topics**: 2 (Email Issues, Test Topic Draft)
- **Unpublished Topics**: 2 (Printer Support, Test Topic Draft)
- **Topics with Zero Usage**: 1 (Laptop Request - active & published but no conversations)