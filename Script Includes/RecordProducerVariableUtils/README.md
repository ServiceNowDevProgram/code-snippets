# RecordProducerVariableUtils

The RecordProducerVariableUtils Script Include provides a utility function to dynamically create and associate variables with a specific record in ServiceNow. This function is designed to work with ServiceNow's Variable Editor to make created variables accessible and visible on record forms.

## Methods

* createVariable(currentGr, order, questionId):
  * Accepts a GlideRecord object, variable display order, and the question's sys_id.
  * Retrieves the table_name and sys_id of the current record.
  * Initializes and inserts a new entry in the question_answer table to associate the variable with the specified record.
  * Returns the sys_id of the newly created variable.

## Usage

Background Script to add an additional variable to a change record:

```javascript
var current = new GlideRecord("change_request");
if (current.get("<SYS_ID>")){
    RecordProducerVariableUtils.createVariable(current, -1000, "<VARIABLE_SYS_ID>");
}
```
