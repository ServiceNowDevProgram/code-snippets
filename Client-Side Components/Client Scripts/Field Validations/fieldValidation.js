function onLoad(){
  var targetViewName = 'your_target_view_name';
    var requiredFields = ['field1', 'field2', 'field3'];
    
    var currentViewName = g_form.getViewName();
    
    if (currentViewName === targetViewName) {
        var emptyFields = [];
        
        for (var i = 0; i < requiredFields.length; i++) {
            var fieldValue = g_form.getValue(requiredFields[i]);
            if (!fieldValue || fieldValue.trim() === '') {
                emptyFields.push(g_form.getLabelOf(requiredFields[i]));
            }
        }
        
        if (emptyFields.length > 0) {
            var errorMessage = "The following required fields cannot be empty: " + 
                             emptyFields.join(', ');
            g_form.addErrorMessage(errorMessage);
        }
    }
}
