<h1>DataValidationUtils - Script Include</h1>

<p><strong>DataValidationUtils</strong> is a reusable Script Include for ServiceNow that provides a set of utility methods to perform validation checks on <code>GlideRecord</code> objects. This Script Include helps enforce data integrity before records are inserted or updated in ServiceNow tables by validating fields like <code>short_description</code> and <code>priority</code> and any others as per your requirements.</p>

<h2>Features</h2>
<ul>
  <li><strong>Field Validation with Error Handling</strong>: Validates that required fields (e.g., <code>short_description</code>, <code>priority</code>) are present and correctly populated. If any field fails validation, an error is returned.</li>
  <li><strong>Field Existence Check</strong>: Prevents runtime errors by ensuring that validation is only performed on fields that exist in the <code>GlideRecord</code>. This is achieved using the <code>isValidField()</code> method, ensuring the script can be safely used across different tables or customized record structures.</li>
  <li><strong>Flexible and Reusable</strong>: The validation logic is encapsulated in a Script Include, making it reusable across different Business Rules, Client Scripts, or other server-side scripts.</li>
</ul>

<h2>Usage Example</h2>
<h3>Validating Incident Data Before Insert</h3>
<p>This example demonstrates how to use <strong>DataValidationUtils</strong> to validate an incident record before inserting it into the database:</p>

<pre><code>var inc = new GlideRecord('incident');
inc.initialize();
inc.short_description = '';  // Missing required field
inc.priority = 6;  // Invalid priority (out of range)

var validator = new DataValidationUtils();
var validationErrors = validator.validateIncidentData(inc);

if (validationErrors.length > 0) {
    gs.error('Validation errors: ' + validationErrors.join(', '));
} else {
    inc.insert();  // Only insert if validation passes
    gs.info('Incident created successfully with number: ' + inc.number);
}
</code></pre>

<h2>Customization</h2>
<p>The <strong>DataValidationUtils</strong> can be extended to include validation for additional fields or custom tables by simply adding more checks in the <code>validateIncidentData</code> method, or by creating new validation methods.</p>
