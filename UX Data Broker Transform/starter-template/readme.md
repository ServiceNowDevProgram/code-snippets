# Transform Data Broker Template

This repository provides a starter template for creating Transform Data Brokers in ServiceNow’s UX framework. This template includes error handling, input validation, and JSDoc annotations for a streamlined setup.

## Features

- **JSDoc Type Annotations** for clarity and type-checking.
- **Destructured Inputs** for simplified parameter handling.
- **Error Logging & Propagation**: Logs errors while allowing the data resource to fail if needed.
- **Properties Example**: Provides an example of what the properties should look like

## Template Overview

```javascript
/**
 * @param {{param1: string, param2: number, param3?: boolean}} inputs 
 * Inputs from the properties field above; param1 and param2 are mandatory.
 * @returns {string} The value returned after transformation.
 */
function transform({ param1, param2, param3 }) {
  const lib = "Data Broker";
  const func = "<insert data broker name here>";
  let res;

  try {
    if (!param1) throw new Error("Missing required param 'param1'");
    if (!param2) throw new Error("Missing required param 'param2'");

    // Add transformation logic here

    return res;
  } catch (e) {
    gs.error(`${lib} ${func} - ${e}`);
    throw new Error(e);
  }
}

/**
 * TIPS
 * Make sure to flag mutates data if your data resource changes any data
 * Properties structure (these are the inputs for your data resource):
 [
    {
        "name": "param1",
        "label": "Param 1",
        "description": "An example of the first param as a string, mandatory",
        "readOnly": false,
        "fieldType": "string",
        "mandatory": true,
        "defaultValue": ""
    },
    {
        "name": "param2",
        "label": "Param 2",
        "description": "An example of the second param as a number, mandatory",
        "readOnly": false,
        "fieldType": "number",
        "mandatory": true,
        "defaultValue": ""
    },
    {
        "name": "param3",
        "label": "Param 3",
        "description": "An example of the third param as a boolean, optional",
        "readOnly": false,
        "fieldType": "boolean",
        "mandatory": false,
        "defaultValue": ""
    }
  ]
 */
```
