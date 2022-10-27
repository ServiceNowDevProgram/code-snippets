// Combine variables into Description
// Type: onSubmit

function onSubmit()
{
  
  // Combine provided all fields to Description field
  
  var description = g_form.getValue ('description');
  var first = g_form.getDisplayValue ('first_variable');
  var second = g_form.getDisplayValue ('second_variable');
  var third = g_form.getDisplayValue ('third_variable');
  
  g_form.setValue('description', ''+ description + '\n\nType: ' + first + '\n Text: ' + second + '\nText: ' + third);
  return true;
}
