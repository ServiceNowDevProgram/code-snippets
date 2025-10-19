function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue == oldValue) return;

    // Mapping backend choice values to background colors
    var colorMap = {
        '1': '#e74c3c',  // Critical - red
        '2': '#e67e22',  // High - orange
        '3': '#f1c40f',  // Moderate - yellow
        '4': '#3498db',  // Low - blue
        '5': '#27ae60'   // Planning - green
    };

    // Get control element of the field dynamically
    var fieldName = 'priority'; 
    var fieldControl = g_form.getControl(fieldName);

    if (!fieldControl) return;

    // Reset previous styles before applying a new one
    fieldControl.style.backgroundColor = '';
    fieldControl.style.transition = 'background-color 0.4s ease'; // smooth effect

    // Apply color if matching value found
    if (colorMap[newValue]) {
        fieldControl.style.backgroundColor = colorMap[newValue];
        fieldControl.style.color = '#fff'; // improves text readability
    } else {
        fieldControl.style.color = ''; // reset if default
    }
}
