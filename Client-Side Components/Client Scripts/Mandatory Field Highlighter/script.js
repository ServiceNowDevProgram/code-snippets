function onLoad() {
    // Highlight mandatory fields that are empty
    highlightMandatoryFields();
    
    // Set up listeners to update highlighting when fields change
    setupFieldListeners();
    
    function highlightMandatoryFields() {
        var allFields = g_form.getFieldNames();
        
        for (var i = 0; i < allFields.length; i++) {
            var fieldName = allFields[i];
            
            // Check if field is mandatory and visible
            if (g_form.isMandatory(fieldName) && g_form.isVisible(fieldName)) {
                var fieldValue = g_form.getValue(fieldName);
                var fieldElement = g_form.getElement(fieldName);
                
                if (fieldElement) {
                    if (!fieldValue || fieldValue === '') {
                        // Add red border for empty mandatory fields
                        fieldElement.style.border = '2px solid #ff4444';
                        fieldElement.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.3)';
                    } else {
                        // Remove highlighting for filled mandatory fields
                        fieldElement.style.border = '';
                        fieldElement.style.boxShadow = '';
                    }
                }
            }
        }
    }
    
    function setupFieldListeners() {
        var allFields = g_form.getFieldNames();
        
        for (var i = 0; i < allFields.length; i++) {
            var fieldName = allFields[i];
            
            if (g_form.isMandatory(fieldName)) {
                // Add change listener to update highlighting
                (function(field) {
                    g_form.addElementChangeListener(field, function() {
                        setTimeout(highlightMandatoryFields, 100);
                    });
                })(fieldName);
            }
        }
    }
}