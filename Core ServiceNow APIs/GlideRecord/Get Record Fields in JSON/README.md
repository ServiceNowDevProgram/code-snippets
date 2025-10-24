<h2>Get Record Fields in JSON</h2>

<h3>Description</h3>
<p>This code fetches all field values from a specified record in ServiceNow and returns them in a JSON format. This is ideal for exporting data or logging record details in a structured format. By simply passing in a table name and a <code>sys_id</code>, it retrieves and formats the fields, allowing for easy data handling.</p>

<h3>Usage</h3>
<p>Call the function and provide:</p>
<ul>
    <li><strong>tableName</strong> (String): The name of the table where the record is stored.</li>
    <li><strong>sysId</strong> (String): The <code>sys_id</code> of the record to retrieve.</li>
</ul>



<h3>Example</h3>
<p>In this example, we fetch all fields from a record in the <code>incident</code> table with a specified <code>sys_id</code> and log the result to the console.</p>
<pre><code>
var recordData = grFetchRecordFields('incident', 'sys_id_value');
gs.info('Record Data: ' + recordData);
</code></pre>

<h4>Output</h4>
<p>If the record with the specified <code>sys_id</code> exists, the output will be a JSON string containing all field names and their values. For example:</p>
<pre><code>{
    "number": "INC0010001",
    "short_description": "Sample incident description",
    "priority": "3",
    "state": "New",
    "assigned_to": "System Administrator",
    ...
}
</code></pre>

<h3>Benefits</h3>
<ul>
    <li><strong>Simplifies data retrieval</strong>: Quickly fetch all field values from a record without manually specifying each field.</li>
    <li><strong>Easy JSON output</strong>: Ideal for logging or API responses where JSON format is needed.</li>
    <li><strong>Reduces errors</strong>: Avoids repetitive code and minimizes the risk of missing fields during retrieval.</li>
</ul>

<h3>Notes</h3>
<ul>
    <li>Ensure <code>tableName</code> and <code>sysId</code> are valid to prevent runtime errors.</li>
    <li>Use this with caution on tables with many fields to avoid performance issues.</li>
</ul>
