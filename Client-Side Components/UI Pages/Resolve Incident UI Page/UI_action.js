function ResolveIncident() {
    var dialog = new GlideModal("resolve_incident");
    dialog.setTitle("Resolve Incident");
    dialog.setPreference('sysparm_record_id', g_form.getUniqueValue());
    dialog.render(); //Open the dialog
}


// Navigate to System UI > UI Actions.
// Create a new UI Action with the following details:
// Name: Resolve Incident (or a descriptive name of your choice).
// Table: Incident [incident].
// Action name: resolve_incident_action (must be a unique, server-safe name).
// Order: A number that determines the position of the button on the form.
// Client: Check this box. This is crucial for running client-side JavaScript.
// Form button: Check this box to display it on the form.
// Onclick: ResolveIncident() (This must match the function name).
// Condition: Set a condition to control when the button is visible (e.g., current.active == true).
