# DEBUG Event UX Client Script

This repository provides a simple UX Client Script for logging events to the console. Named `DEBUG Event`, this client script is designed to assist in debugging by outputting key event details to the console, helping developers track event triggers and properties in real-time.

## Features

- **Console Logging**: Logs event details, including `elementId` and `name`, to the console for easy tracking.
- **Simplified Debugging**: Useful for monitoring and debugging UX interactions without complex setup.

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
  console.log(`DEBUG Event ${event.elementId} ${event.name}`, event);
}
