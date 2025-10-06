# GlideRecord Example - Query Active Incidents

**Purpose:**  
Demonstrates how to use the `GlideRecord` API in a server-side script to query the **Incident** table for active records and print basic field values.

---

## Example Code

```js
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.orderByDesc('sys_created_on');
gr.setLimit(10);
gr.query();

while (gr.next()) {
  gs.info('Number: ' + gr.getValue('number') +
          ', Short Description: ' + gr.getValue('short_description') +
          ', Assigned To: ' + gr.getDisplayValue('assigned_to'));
}

var gr = new GlideRecord('incident');	Creates a new GlideRecord object for the Incident table
gr.addQuery('active', true);	Filters only active incidents
gr.orderByDesc('sys_created_on');	Orders results from newest to oldest
gr.setLimit(10);	Limits the query to 10 records
gr.query();	Executes the query
while (gr.next())	Loops through each record found
gs.info(...)	Prints information to system logs
