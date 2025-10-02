function onLoad() {
    // Highlight mandatory fields that are empty using proper ServiceNow methods
    highlightMandatoryFields();
    
    function highlightMandatoryFields() {
        var allFields = g_form.getFieldNames();
        
        for (var i = 0; i < allFields.length; i++) {
            var fieldName = allFields[i];
            
            // Check if field is mandatory and visible
            if (g_form.isMandatory(fieldName) && g_form.isVisible(fieldName)) {
                var fieldValue = g_form.getValue(fieldName);
                
                if (!fieldValue || fieldValue === '') {
                    // Show warning message for empty mandatory fields
                    g_form.showFieldMsg(fieldName, 'This field is required', 'error');
                } else {
                    // Clear any existing field messages
                    g_form.hideFieldMsg(fieldName);
                }
            }
        }
    }
    
    // Store function globally so onChange scripts can call it
    window.updateMandatoryHighlighting = highlightMandatoryFields;
}