//Auto Priority Update based on Impact and Urgency

// ==========================================================================
// Script Name: Auto Priority Update based on Impact and Urgency
// Table: Incident (or any Task-based table)
// Type: onChange | Fields: impact, urgency
// UI Type: All
// ==========================================================================

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    // Prevent the script from running when the form loads or when the field is empty
    if (isLoading || newValue == '') {
        return;
    }

    // ----------------------------------------------------------------------
    // Step 1: Fetch field values from the form
    // ----------------------------------------------------------------------
    var impact = g_form.getValue('impact');   // e.g., 1 - High, 2 - Medium, 3 - Low
    var urgency = g_form.getValue('urgency'); // e.g., 1 - High, 2 - Medium, 3 - Low

    // ----------------------------------------------------------------------
    // Step 2: Define the ITIL-based Priority Matrix
    // ----------------------------------------------------------------------
    // Each row represents "Impact", and each column represents "Urgency"
    // The resulting value sets the "Priority"
    var priorityMatrix = {
        '1': { '1': '1', '2': '2', '3': '3' }, // Impact = High
        '2': { '1': '2', '2': '3', '3': '4' }, // Impact = Medium
        '3': { '1': '3', '2': '4', '3': '5' }  // Impact = Low
    };

    // ----------------------------------------------------------------------
    // Step 3: Determine the new priority based on selected Impact/Urgency
    // ----------------------------------------------------------------------
    var newPriority = priorityMatrix[impact]?.[urgency]; // optional chaining prevents errors

    // ----------------------------------------------------------------------
    // Step 4: Update the Priority field and inform the user
    // ----------------------------------------------------------------------
    if (newPriority) {
        // Only update if priority is different from current value
        if (g_form.getValue('priority') != newPriority) {
            g_form.setValue('priority', newPriority);

            // Show message (works in both Classic UI and Next Experience)
            g_form.showFieldMsg('priority', 'Priority auto-updated based on Impact and Urgency', 'info');
        }
    } else {
        // Optional: clear priority if invalid combination is selected
        g_form.clearValue('priority');
        g_form.showFieldMsg('priority', 'Invalid Impact/Urgency combination — priority cleared', 'error');
    }

    // ----------------------------------------------------------------------
    // End of Script
    // ----------------------------------------------------------------------
}
