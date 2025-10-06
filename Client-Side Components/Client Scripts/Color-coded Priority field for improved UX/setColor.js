function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) return; // Skip when loading the form

  // Map backend choice values to colors
  var colorMap = {
    '1': '#e74c3c',  // Critical - strong red
    '2': '#e67e22',  // High - bright orange
    '3': '#f1c40f',  // Moderate - yellow
    '4': '#3498db',  // Low - blue
    '5': '#27ae60'   // Planning - green
  };

  // Replace 'priority' with your field name
  var fieldControl = g_form.getControl('priority');
  if (!fieldControl) return;

  // Apply background color based on selected value
  fieldControl.style.backgroundColor = colorMap[newValue] || '';
}
