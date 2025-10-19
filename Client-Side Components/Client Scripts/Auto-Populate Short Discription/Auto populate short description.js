function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    // Define category-to-short description mapping
    var categoryToShortDescription = {
        'hardware': 'Hardware Issue - ',
        'software': 'Software Issue - ',
        'network': 'Network Issue - ',
        'inquiry': 'Inquiry/Help - ',
		'database': 'Database - '
    };

    // Convert the selected value to lowercase for matching
    var selectedCategory = newValue.toLowerCase();

    // If category exists in mapping, update the short description
    if (categoryToShortDescription.hasOwnProperty(selectedCategory)) {
        var existingDesc = g_form.getValue('short_description') || '';
        var prefix = categoryToShortDescription[selectedCategory];

        // Only add prefix if it's not already there
        if (!existingDesc.startsWith(prefix)) {
            g_form.setValue('short_description', prefix + existingDesc);
            g_form.showFieldMsg('short_description', 'Short Description auto-updated based on category.', 'info');
        }
    }
}
