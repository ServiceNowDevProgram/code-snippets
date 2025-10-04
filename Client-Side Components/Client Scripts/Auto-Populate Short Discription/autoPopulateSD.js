// Client Script to Auto-Populate Short Description based on Category

function onChangeCategory() {
    var categoryField = g_form.getValue('category'); // Get the selected category
    var shortDescriptionField = g_form.getValue('short_description'); // Get the Short Description field

    // Define mappings for categories and corresponding short descriptions
    var categoryToShortDescription = {
        'Hardware': 'Hardware Issue - ',
        'Software': 'Software Issue - ',
        'Network': 'Network Issue - ',
        'Other': 'Other Issue - '
    };

    // Update Short Description based on the selected category
    if (categoryToShortDescription.hasOwnProperty(categoryField)) {
        var newShortDescription = categoryToShortDescription[categoryField] + shortDescriptionField;
        g_form.setValue('short_description', newShortDescription);
    }
}

// Attach the onChangeCategory function to the 'category' field
g_form.observe('change', 'category', onChangeCategory);
