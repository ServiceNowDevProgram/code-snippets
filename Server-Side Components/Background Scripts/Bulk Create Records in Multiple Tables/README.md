# Function: `bulkCreateRecords(target)`

Creates multiple records in specified tables based on provided data.

## Parameters

- **`target`** (`Object`): An object where each key is the name of a table, and each value is an array of objects representing the records to be created. Each object in the array should contain field-value pairs for the respective table.

## Example Usage

```javascript
bulkCreateRecords({
    'incident': [
        { short_description: 'Network issue', caller_id: '681ccaf9c0a8016401c5a33be04be441', priority: 2 },
        { short_description: 'Email outage', caller_id: '681ccaf9c0a8016401c5a33be04be442', priority: 1 }
    ],
    'change_request': [
        { short_description: 'Server upgrade', assigned_to: '681ccaf9c0a8016401c5a33be04be443', state: 'new' }
    ]
});