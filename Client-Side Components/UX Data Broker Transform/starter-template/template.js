/**
 * This is a starter template for a transform data broker with:
 * - JSDoc type annotations
 * - Destructured inputs
 * - Try/catch
 * - Error logging then throw (Enables error logging but still allows the data resource to fail)
 * @param {{param1: string, param2: number, param3?: boolean}} inputs inputs from the properties field above, param1 and param2 are mandatory
 * @returns {string} the value returned
 */
function transform({ param1, param2, param3 }) {
  const lib = "Data Broker";
  const func = "<insert data broker name here>";

  /** @type {string} */
  let res;

  try {
    // Handle required param checks
    if (!param1) throw new Error("Missing required param 'param1'");
    if (!param2) throw new Error("Missing required param 'param2'");

    // Add logic here

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
