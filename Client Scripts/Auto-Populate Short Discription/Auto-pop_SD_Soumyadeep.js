function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }


    // Define mappings for categories and corresponding short descriptions
    var categoryToShortDescription = {
        'hardware': 'Hardware is selected  ',
        'software': 'Software is selected  ',
        'network': 'Network is selected  ',
        'database': 'Database is selected  '
    };

    // Update Short Description based on the selected category
    if (categoryToShortDescription.hasOwnProperty(newValue)) {

		var shortDescriptionField = g_form.getValue('short_description') || ''; // Get the Short Description field

        g_form.setValue('short_description', categoryToShortDescription[newValue] + shortDescriptionField);
    }
}
