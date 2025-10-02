/**
 * dynamic-form-view-onchange.js
 *
 * Dynamically switches the form view automatically depending on the value of a specific field.
 * Example: If Category = Hardware → switch to ess view.
 * Extendable by modifying the mapping object for different fields/values.
 *
 */

function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || !newValue) {
    return;
  }

  // Field value → view name mapping
  var viewMapping = {
    "hardware": "ess",
    "software": "itil",
    "network": "support"
  };

  var fieldValue = newValue.toLowerCase();
  var targetView = viewMapping[fieldValue];

  if (targetView) {
    try {
      // Here for example the table name is incident
      switchView("section", "incident", targetView);
    } catch (e) {
      console.error("View switch failed: ", e);
    }
  }
}
