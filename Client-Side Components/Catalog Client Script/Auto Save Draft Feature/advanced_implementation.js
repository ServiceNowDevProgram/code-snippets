/**
 * Advanced Auto-save Draft Implementation with Enhanced Features
 * This version adds multi-draft support and advanced error handling
 */

function onLoad() {
    var autosaveInterval = 60000; // 1 minute
    var maxDrafts = 3; // Maximum number of drafts to keep
    
    // Initialize draft manager
    initializeDraftManager();
    
    // Try to restore previous draft
    restoreLastDraft();
    
    // Set up auto-save interval
    setInterval(function() {
        if (g_form.isModified()) {
            saveAdvancedDraft();
        }
    }, autosaveInterval);
}

function initializeDraftManager() {
    window.draftManager = {
        maxDrafts: 3,
        draftPrefix: 'catalogDraft_' + g_form.getUniqueValue() + '_',
        
        getAllDrafts: function() {
            var drafts = [];
            for (var i = 0; i < sessionStorage.length; i++) {
                var key = sessionStorage.key(i);
                if (key.startsWith(this.draftPrefix)) {
                    drafts.push({
                        key: key,
                        data: JSON.parse(sessionStorage.getItem(key))
                    });
                }
            }
            return drafts.sort((a, b) => b.data.timestamp - a.data.timestamp);
        },
        
        cleanup: function() {
            var drafts = this.getAllDrafts();
            if (drafts.length > this.maxDrafts) {
                drafts.slice(this.maxDrafts).forEach(function(draft) {
                    sessionStorage.removeItem(draft.key);
                });
            }
        }
    };
}

function saveAdvancedDraft() {
    try {
        var draftData = {};
        g_form.serialize(draftData);
        
        // Add metadata
        var draftKey = window.draftManager.draftPrefix + new Date().getTime();
        var draftInfo = {
            timestamp: new Date().getTime(),
            data: draftData,
            user: g_user.userName,
            catalog_item: g_form.getTableName(),
            fields_modified: g_form.getModifiedFields()
        };
        
        sessionStorage.setItem(draftKey, JSON.stringify(draftInfo));
        window.draftManager.cleanup();
        
        // Show success message with draft count
        var remainingDrafts = window.draftManager.getAllDrafts().length;
        g_form.addInfoMessage('Draft saved. You have ' + remainingDrafts + ' saved draft(s).');
        
    } catch (e) {
        console.error('Error saving draft: ' + e);
        g_form.addErrorMessage('Failed to save draft: ' + e.message);
    }
}

function restoreLastDraft() {
    try {
        var drafts = window.draftManager.getAllDrafts();
        
        if (drafts.length > 0) {
            // If multiple drafts exist, show selection dialog
            if (drafts.length > 1) {
                showDraftSelectionDialog(drafts);
            } else {
                promptToRestoreDraft(drafts[0].data);
            }
        }
    } catch (e) {
        console.error('Error restoring draft: ' + e);
        g_form.addErrorMessage('Failed to restore draft: ' + e.message);
    }
}

function showDraftSelectionDialog(drafts) {
    var dialog = new GlideModal('select_draft_dialog');
    dialog.setTitle('Available Drafts');
    
    var html = '<div class="draft-list">';
    drafts.forEach(function(draft, index) {
        var date = new Date(draft.data.timestamp).toLocaleString();
        html += '<div class="draft-item" onclick="selectDraft(' + index + ')">';
        html += '<strong>Draft ' + (index + 1) + '</strong> - ' + date;
        html += '<br>Modified fields: ' + draft.data.fields_modified.join(', ');
        html += '</div>';
    });
    html += '</div>';
    
    dialog.renderWithContent(html);
}

function promptToRestoreDraft(draftInfo) {
    var timestamp = new Date(draftInfo.timestamp);
    if (confirm('A draft from ' + timestamp.toLocaleString() + ' was found. Would you like to restore it?')) {
        Object.keys(draftInfo.data).forEach(function(field) {
            g_form.setValue(field, draftInfo.data[field]);
        });
        g_form.addInfoMessage('Draft restored from ' + timestamp.toLocaleString());
    }
}