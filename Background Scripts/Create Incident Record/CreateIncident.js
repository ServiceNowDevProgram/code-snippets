// Create a GlideRecord object for the "incident" table
var gr = new GlideRecord('incident');

// Create a new incident record
gr.initialize();
gr.short_description = 'New Incident'; // Set the short description
gr.description = 'This is a new incident created via script.'; // Set the description

// Set other field values as needed
gr.caller_id = 'user_id'; // Set the caller (replace 'user_id' with the actual user's Sys ID)
gr.priority = '2'; // Set the priority (you can use the desired priority value)

// Insert the new incident record
gr.insert();

// Check if the record was created successfully
if (gr.insert()) {
    gs.info('Incident created with number: ' + gr.number);
} else {
    gs.error('Incident creation failed: ' + gr.getErrorMessage());
}
