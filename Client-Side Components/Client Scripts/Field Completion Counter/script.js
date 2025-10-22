function onLoad() {
    // Display field completion counter
    showFieldProgress();
    
    // Set up listener for field changes
    setupProgressUpdater();
    
    function showFieldProgress() {
        var allFields = g_form.getFieldNames();
        var visibleFields = [];
        var filledFields = 0;
        
        // Count visible, editable fields
        for (var i = 0; i < allFields.length; i++) {
            var fieldName = allFields[i];
            
            // Skip system fields and hidden/readonly fields
            if (fieldName.indexOf('sys_') === 0 || 
                !g_form.isVisible(fieldName) || 
                g_form.isReadOnly(fieldName)) {
                continue;
            }
            visibleFields.push(fieldName);
            
            // Check if field has value
            if (g_form.getValue(fieldName)) {
                filledFields++;
            }
        }
        var totalFields = visibleFields.length;
        var percentage = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
        
        g_form.addInfoMessage('Form Progress: ' + filledFields + '/' + totalFields + ' fields completed (' + percentage + '%)');
    }
    
    function setupProgressUpdater() {
        // Simple debounced update
        var updateTimer;
        
        function updateProgress() {
            clearTimeout(updateTimer);
            updateTimer = setTimeout(function() {
                g_form.clearMessages();
                showFieldProgress();
            }, 500);
        }
        
        // Listen for any field change
        var allFields = g_form.getFieldNames();
        for (var i = 0; i < allFields.length; i++) {
            g_form.addElementChangeListener(allFields[i], updateProgress);
        }
    }
}