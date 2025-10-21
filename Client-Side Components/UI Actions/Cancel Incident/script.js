/**
 * Client-side function to initiate incident cancellation
 * Displays a confirmation modal before proceeding with the cancellation
 */
function cancelIncident() {
    try {
        // Validate that we have a valid form and record
        if (!g_form || !g_form.getUniqueValue()) {
            alert('Error: Unable to access incident record. Please refresh the page and try again.');
            return;
        }

        // Check if incident is in the correct state for cancellation
        var currentState = g_form.getValue('state');
        if (currentState !== '1') {
            alert('Error: This incident cannot be cancelled. Only incidents in "New" state can be cancelled.');
            return;
        }

        // Create confirmation modal with improved messaging
        var gm = new GlideModal("glide_ask_standard", false, 600);
        gm.setPreference("title", "Cancel Incident Confirmation");
        gm.setPreference("warning", true);
        gm.setPreference("onPromptComplete", function() {
            // Show loading message
            g_form.addInfoMessage('Cancelling incident...');
            
            // Submit the form to trigger server-side processing
            gsftSubmit(null, g_form.getFormElement(), 'cancel_incident');
        });
        
        // Set the confirmation message
        gm.setPreference("question", "Are you sure you want to cancel this incident?\n\nThis action will change the incident state to 'Cancelled' and cannot be easily undone.");
        
        // Render the modal
        gm.render();
        
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error in cancelIncident function:', error);
        alert('An unexpected error occurred. Please contact your system administrator.');
    }
}

/**
 * Server-side execution block
 * This code runs on the server when the UI Action is submitted
 */
if (typeof window == 'undefined') {
    serverCancel();
}

/**
 * Server-side function to cancel the incident
 * Updates the incident state to 'Cancelled' and adds a work note
 */
function serverCancel() {
    try {
        // Validate that we have a current record
        if (!current || !current.isValidRecord()) {
            gs.addErrorMessage('Error: Invalid incident record.');
            return;
        }

        // Double-check the current state before cancelling
        if (current.state.toString() !== '1') {
            gs.addErrorMessage('Error: This incident cannot be cancelled. Only incidents in "New" state can be cancelled.');
            return;
        }

        // Store original values for logging
        var incidentNumber = current.number.toString();
        var originalState = current.state.getDisplayValue();
        
        // Update the incident state to 'Cancelled' (state value 8)
        current.state = '8';
        
        // Add a work note to document the cancellation
        var workNote = 'Incident cancelled by ' + gs.getUserDisplayName() + ' on ' + gs.nowDateTime();
        if (current.work_notes.nil()) {
            current.work_notes = workNote;
        } else {
            current.work_notes = current.work_notes + '\n\n' + workNote;
        }
        
        // Update the record
        current.update();
        
        // Log the action for audit purposes
        gs.info('Incident ' + incidentNumber + ' cancelled by user ' + gs.getUserName() + 
                '. State changed from "' + originalState + '" to "Cancelled"');
        
        // Provide user feedback
        gs.addInfoMessage('Incident ' + incidentNumber + ' has been successfully cancelled.');
        
    } catch (error) {
        // Handle server-side errors
        gs.error('Error cancelling incident: ' + error.message);
        gs.addErrorMessage('An error occurred while cancelling the incident. Please contact your system administrator.');
    }
}
