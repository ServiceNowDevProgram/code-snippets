function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    // Prevent execution during form load or when value is empty
    if (isLoading || newValue === '') {
        return;
    }

    // Dummy values for state comparison
    // Assuming:
    // 6 = Resolved
    // 7 = Closed Complete
    var RESOLVED = 6;
    var CLOSED = 7;

    // Prevent direct move to Closed without passing through Resolved
    if (newValue == CLOSED && oldValue != RESOLVED) {
        
        // Reset to previous state
        g_form.setValue('state', oldValue);

        // Show validation warning
        g_form.addErrorMessage(
            'Direct closure is not allowed. Please first move the incident to Resolved state.'
        );

        // Reload page after showing error
        setTimeout(function() {
            location.reload();
        }, 3000);
    }
}
