/**
 * This data broker creates or updates a user preference of the given name with the given value
 * @param {{name: string, value?: string}} inputs inputs from the properties field above
 */
function transform({ name, value }) {
  const lib = "Data Broker";
  const func = "Create/Update User Preference";
  try {
    if (!name) throw new Error("Missing required param 'name'");


    gs.getUser().savePreference(name, value);
  } catch (e) {
    gs.error(`${lib} ${func} - ${e}`);
    throw new Error(e);
  }
}

/**
 * Make sure to select that this data broker mutates data
 * Input this in the properties field:
 * 
 [
    {
        "name": "name",
        "label": "Name",
        "description": "The name of the user preference to create or update",
        "readOnly": false,
        "fieldType": "string",
        "mandatory": true,
        "defaultValue": ""
    },
    {
        "name": "value",
        "label": "Value",
        "description": "The value to store in the user preference",
        "readOnly": false,
        "fieldType": "string",
        "mandatory": false,
        "defaultValue": ""
    }
  ]
 */
