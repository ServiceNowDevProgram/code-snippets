# Debug State UX Client Script

This repository contains a UX Client Script called `Debug State`, designed to log the current client state to the console. This script is useful for developers who want to inspect the state object in real time, making debugging more efficient by allowing quick access to current state values.

## Features

- **Console Logging of State**: Logs the entire `state` object to the console, enabling developers to track and inspect state changes.
- **Efficient Debugging**: Simplifies the debugging process by providing direct access to the client's state.

## Script Overview

```javascript
/**
 * @param {params} params
 * @param {api} params.api
 * @param {any} params.event
 * @param {any} params.imports
 * @param {ApiHelpers} params.helpers
 */
function handler({ api, event, helpers, imports }) {
  console.log(`DEBUG State:`, { ...api.state });
}
```
