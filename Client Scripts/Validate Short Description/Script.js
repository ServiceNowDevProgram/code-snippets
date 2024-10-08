// Client Script: Validate Short Description
// Table: incident
// Type: onSubmit

function onSubmit() {
    var shortDesc = g_form.getValue('short_description'); // Get the value of the short description field
    if (shortDesc.length < 15) { // Check if the length is less than 15 characters
        alert('Short description must be at least 15 characters long.'); // Alert the user
        return false; // Prevent form submission
    }
    return true; // Allow form submission if the validation passes
}
