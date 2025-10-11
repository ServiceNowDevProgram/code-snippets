# Bulk Delete Function Documentation - Use the code/function to bulk-deletes records from multiple tables based on provided encoded queries.

# Function: `bulkDelete(target)`

Deletes records from multiple tables based on provided encoded queries.

## Parameters

- **`target`** (`Object`): An object where each key is the name of a table, and each value is an encoded query string. 
  - The function will delete all records matching the encoded query for each specified table.

## Example Usage

```javascript
bulkDelete({
    'incident': 'priority=1^state=2',
    'change_request': 'state=3^risk=high'
});
```
 
