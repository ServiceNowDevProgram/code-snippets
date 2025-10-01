// Please check readme for the set up
var data = {
  Japan: ["Tokyo", "Osaka"],
  USA: ["New York", "Chicago", "San Diego"],
};

function onChange(control, oldValue, newValue, isLoading) {
  var secondDropdown = "city";

  g_form.clearOptions(secondDropdown); // Remove all the options of the 2nd dropdown

  // When user switch to 'None' in country or when the form is loaded
  if (newValue == "" || isLoading) {
    return;
  }

  var cities = data[newValue];

  if (cities && cities.length) {
    cities.forEach(function (value) {
      g_form.addOption(secondDropdown, value, value);
    });
  }
}
