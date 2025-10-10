/**
 * Basic Auto-save Draft Implementation
 * This version provides core functionality for auto-saving catalog item form data
 */

function onLoad() {
    var autosaveInterval = 60000; // 1 minute
    
    // Try to restore previous draft
    restoreLastDraft();
    
    // Set up auto-save interval
    setInterval(function() {
        if (g_form.isModified()) {
            saveDraft();
        }
    }, autosaveInterval);
}

function saveDraft() {
    try {
        var draftData = {};
        g_form.serialize(draftData);
        
        var draftKey = 'catalogDraft_' + g_form.getUniqueValue();
        sessionStorage.setItem(draftKey, JSON.stringify({
            timestamp: new Date().getTime(),
            data: draftData
        }));
        
        g_form.addInfoMessage('Draft saved automatically');
    } catch (e) {
        console.error('Error saving draft: ' + e);
    }
}

function restoreLastDraft() {
    try {
        var draftKey = 'catalogDraft_' + g_form.getUniqueValue();
        var savedDraft = sessionStorage.getItem(draftKey);
        
        if (savedDraft) {
            var draftData = JSON.parse(savedDraft);
            var timestamp = new Date(draftData.timestamp);
            
            if (confirm('A draft from ' + timestamp.toLocaleString() + ' was found. Would you like to restore it?')) {
                Object.keys(draftData.data).forEach(function(field) {
                    g_form.setValue(field, draftData.data[field]);
                });
                g_form.addInfoMessage('Draft restored from ' + timestamp.toLocaleString());
            } else {
                sessionStorage.removeItem(draftKey);
            }
        }
    } catch (e) {
        console.error('Error restoring draft: ' + e);
    }
}