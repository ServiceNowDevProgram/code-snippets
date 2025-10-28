function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || !newValue || newValue.length < 10) {
        return;
    }

    var keywords = [
        { 
            pattern: /password|login|access/i, 
            category: 'inquiry | Help ',             
            subcategory: 'antivirus',        
            priority: '3', 
            suggestion: 'This appears to be a Inquiry issue.' 
        },
        { 
            pattern: /slow|performance|hanging/i, 
            category: 'software',          
            subcategory: 'email',          
            priority: '2', 
            suggestion: 'This appears to be a Software issue.' 
        },
        { 
            pattern: /printer|print|printing/i, 
            category: 'hardware',            
            subcategory: 'monitor',         
            priority: '3', 
            suggestion: 'This appears to be a Hardware issue.' 
        },
        { 
            pattern: /database|data/i, 
            category: 'database',          
            subcategory: 'db2',             
            priority: '3', 
            suggestion: 'This appears to be an Database issue.' 
        },
        { 
            pattern: /network|internet|wifi|connection/i, 
            category: 'network',             
            subcategory: 'vpn',               
            priority: '2', 
            suggestion: 'This appears to be a network issue.' 
        }
        
    ];

    var lowerDesc = newValue.toLowerCase();
    var matched = null;

    for (var i = 0; i < keywords.length; i++) {
        if (keywords[i].pattern.test(lowerDesc)) {
            matched = keywords[i];
            break;
        }
    }

    g_form.hideFieldMsg('short_description', true);
    g_form.clearMessages();

    if (matched) {
        g_form.showFieldMsg('short_description', matched.suggestion, 'info', false);

        if (confirm(matched.suggestion + "\n\nApply these suggestions?")) {
            g_form.setValue('category', matched.category);
            g_form.setValue('subcategory', matched.subcategory); // Make sure you use backend value for subcategory!
            g_form.setValue('priority', matched.priority);
            g_form.addInfoMessage('Suggestions applied automatically!');
        } else {
            g_form.addInfoMessage('Suggestions dismissed.');
            g_form.hideFieldMsg('short_description', true);
        }
    } else {
        g_form.addInfoMessage('No keywords matched in description.');
    }
}
