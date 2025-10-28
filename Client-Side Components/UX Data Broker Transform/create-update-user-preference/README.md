# Create/Update User Preference Data Broker

This repository provides a data broker for creating or updating user preferences in ServiceNow. The broker allows you to specify a preference name and value, storing or updating it in the user’s preferences.

## Features

- **Create or Update User Preferences**: Provides a simple interface for adding or modifying preferences by name and value.
- **Error Handling**: Logs errors if the preference name is missing or if an unexpected issue arises.

## Template Overview

```javascript
/**
 * This data broker creates or updates a user preference of the given name with the given value
 * @param {{name: string, value?: string}} inputs inputs from the properties field above
 */
function transform({ name, value }) {
  const lib = "Data Broker";
  const func = "Create Update User Preference";
  try {
    if (!name) throw new Error("Missing required param 'name'");

    gs.getUser().savePreference(name, value);
  } catch (e) {
    gs.error(`${lib} ${func} - ${e}`);
    throw new Error(e);
  }
}
```
