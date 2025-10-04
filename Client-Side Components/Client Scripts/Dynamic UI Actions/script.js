function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    // Adjust condition to your needs
    if (newValue === "true") { 
        $$('button[data-action-name^=action_name').each(function(e) { // replace action_name with the action name of the UI Action
            e.hide();
        });
    } else {
        $$('button[data-action-name^=action_name').each(function(e) { // replace action_name with the action name of the UI Action
            e.show();
        });
    }
}
