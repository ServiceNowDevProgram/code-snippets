var grIncident = new GlideRecord('incident');
grIncident.addQuery('category', ''); // Only process uncategorized incidents
grIncident.query();

while (grIncident.next()) {
    try {
        var description = grIncident.getValue('short_description');
        var category = categorizeIncident(description); // Call helper function to categorize

        if (category) {
            grIncident.category = category;
            grIncident.update();
            gs.info('Incident ' + grIncident.number + ' categorized as ' + category);
        } else {
            gs.warn('No category found for incident ' + grIncident.number);
        }
    } catch (e) {
        gs.error('Failed to categorize incident ' + grIncident.number + ': ' + e.message);
    }
}

// Helper function to categorize incidents based on keywords
function categorizeIncident(description) {
    if (!description) return null;

    description = description.toLowerCase();
    if (description.includes('email')) return 'Email';
    if (description.includes('network')) return 'Network';
    if (description.includes('password')) return 'Password Reset';
    if (description.includes('hardware')) return 'Hardware';
    return null;
}
