// Client Script to Validate Special Charecters
function onSubmit() {
    var shortDescription = g_form.getValue('short_description');
  var specialCharsRegex = /[^a-zA-Z0-9\s]/g;
var specialChars = description.match(specialCharsRegex);
  if (specialChars) {
        alert('Description contains invalid characters: ' + specialChars.join(', '));
        return false;
    } else {
        return true;
    }
    
