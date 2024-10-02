# Bulk Update Function Documentation - Use the code/function to bulk change some fields in any tables.

## `bulkUpdate(table, query, data)`

Performs a bulk update on a specified table, applying the given data to all records that match the query.

### Parameters

- **`table`** (`string`): The name of the table where the bulk update is to be performed.
- **`query`** (`string`): The encoded query string that filters which records to update.
- **`data`** (`Object`): An object representing the field-value pairs to update. 
  - Each key is a field name, and the value is the new value for that field.

### Example Usage

```javascript
bulkUpdate('incident', 'priority=1^state=2', { priority: 2, state: 3 });
```
 
