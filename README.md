# GlideRecord Field Names Utility

## Overview
The **GlideRecord Field Names Utility** is a JavaScript function designed for ServiceNow developers. This utility retrieves the names of all fields present in a given GlideRecord instance. It simplifies the process of dynamically accessing field names, which can be particularly useful in scenarios involving data manipulation or logging.

## Features
- Safely checks if the provided GlideRecord instance is valid and not empty.
- Returns an array of field names for the given GlideRecord.
- Avoids errors by handling invalid input gracefully.

## Installation
To use the `getFieldNames` function in your ServiceNow scripts, simply copy the function into your script or business rule where you need to retrieve field names.

## Usage
Here’s how you can use the `getFieldNames` function:

```javascript
var gr = new GlideRecord('your_table_name');
gr.query();
if (gr.next()) {
    var fieldNames = getFieldNames(gr);
    gs.info('Field Names: ' + fieldNames.join(', '));
}
