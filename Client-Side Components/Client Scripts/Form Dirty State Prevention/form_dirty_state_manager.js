// Client Script: Form Dirty State Manager
// Purpose: Track form changes and warn user before leaving with unsaved changes

var FormDirtyStateManager = Class.create();
FormDirtyStateManager.prototype = {
    initialize: function() {
        this.isDirty = false;
        this.setupFieldChangeListeners();
        this.setupNavigationWarning();
    },
    
    // Mark form as changed when any field is modified
    setupFieldChangeListeners: function() {
        var self = this;
        g_form.addOnFieldChange('*', function(control, oldValue, newValue, isLoading) {
            // Ignore system updates and form loads
            if (isLoading || oldValue === newValue) {
                return;
            }
            self.setDirty(true);
        });
    },
    
    // Warn user before navigating away with unsaved changes
    setupNavigationWarning: function() {
        var self = this;
        
        // Warn on form close attempt
        window.addEventListener('beforeunload', function(e) {
            if (self.isDirty && !g_form.isNewRecord()) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Do you want to leave?';
                return e.returnValue;
            }
        });
        
        // Warn on GlideForm navigation
        g_form.addOnSave(function() {
            // Reset dirty flag after successful save
            self.setDirty(false);
            return true;
        });
    },
    
    setDirty: function(isDirty) {
        this.isDirty = isDirty;
        if (isDirty) {
            // Optional: Show visual indicator
            document.title = '* ' + document.title.replace(/^\* /, '');
            gs.info('[Form State] Unsaved changes detected');
        }
    },
    
    isDirtyState: function() {
        return this.isDirty;
    }
};

// Initialize on form load
var formDirtyState = new FormDirtyStateManager();
