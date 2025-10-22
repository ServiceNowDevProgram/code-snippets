/**
 * Auto-save draft feature for Catalog Client Script
 * 
 * This script automatically saves form data as a draft in the browser's sessionStorage
 * every minute if changes are detected. It also provides functionality to restore
 * the last saved draft when the form is loaded.
 */

// Executes when the form loads
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

// Saves the current form state as a draft
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

// Restores the last saved draft if available
function restoreLastDraft() {
    try {
        var draftKey = 'catalogDraft_' + g_form.getUniqueValue();
        var savedDraft = sessionStorage.getItem(draftKey);
        
        if (savedDraft) {
            var draftData = JSON.parse(savedDraft);
            var timestamp = new Date(draftData.timestamp);
            
            // Ask user if they want to restore the draft
            if (confirm('A draft from ' + timestamp.toLocaleString() + ' was found. Would you like to restore it?')) {
                Object.keys(draftData.data).forEach(function(field) {
                    g_form.setValue(field, draftData.data[field]);
                });
                g_form.addInfoMessage('Draft restored from ' + timestamp.toLocaleString());
            } else {
                // Clear the draft if user chooses not to restore
                sessionStorage.removeItem(draftKey);
            }
        }
    } catch (e) {
        console.error('Error restoring draft: ' + e);
    }
}