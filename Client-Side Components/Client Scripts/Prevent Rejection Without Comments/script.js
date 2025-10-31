//Prevent Rejection Without Comments
function onSubmit() {
    // Get the current state value of the approval record
    var state = g_form.getValue('state');

    // Get the comments entered by the approver
    var comments = g_form.getValue('comments');

    // Check if the approver is trying to REJECT the record
    // The out-of-box (OOB) value for rejection in sysapproval_approver is "rejected"
    // If state is 'rejected' and comments are empty, stop the submission
    if (state == 'rejected' && !comments) {

        // Display an error message to the user
        g_form.addErrorMessage('Please provide comments before rejecting the approval.');

        // Prevent the form from being submitted (block save/update)
        return false;
    }

    // Allow the form submission if validation passes
    return true;
}
