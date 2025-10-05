function onChange(control, oldValue, newValue, isLoading) {

  var colorMap = {
    '1': '#e74c3c',  // Critical - strong red
    '2': '#e67e22',  // High - bright orange
    '3': '#f1c40f',  // Moderate - yellow
    '4': '#3498db',  // Low - blue
    '5': '#27ae60'   // Planning - green
  };

  var priorityField = g_form.getControl('priority');
  if (!priorityField) return;

  priorityField.style.backgroundColor = colorMap[newValue] || '';
}
