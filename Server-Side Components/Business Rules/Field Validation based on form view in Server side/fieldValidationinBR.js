(function executeRule(current, previous /*null when async*/ ) {
    var TARGET_VIEW_NAME = 'your_target_view_name';
    var FIELD_VALIDATIONS = [
        {field: 'field1', expectedValue: 'value1', errorMsg: 'Field 1 validation failed'},
        {field: 'field2', expectedValue: 'value2', errorMsg: 'Field 2 validation failed'},
        {field: 'field3', expectedValue: 'value3', errorMsg: 'Field 3 validation failed'}
    ];
    
    var gURI = "";
    try {
        gURI = gs.action.getGlideURI();
    } catch(e) {
        return;
    }
    
    var view_name = gURI.get('sysparm_view');
    
    if (view_name == TARGET_VIEW_NAME) {
        var validationErrors = [];
        
        for (var i = 0; i < FIELD_VALIDATIONS.length; i++) {
            var validation = FIELD_VALIDATIONS[i];
            var fieldValue = current.getValue(validation.field);
            
            if (gs.nil(fieldValue)) {
                validationErrors.push(validation.field + ' is required');
                continue;
            }
            
            if (fieldValue != validation.expectedValue) {
                validationErrors.push(validation.errorMsg);
            }
        }
        
        if (validationErrors.length > 0) {
            gs.addErrorMessage(gs.getMessage("Validation failed: {0}", validationErrors.join(', ')));
        }
    }
})(current, previous);
