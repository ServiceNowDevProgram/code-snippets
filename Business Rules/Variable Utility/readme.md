# ServiceNow Variable Utilities and Business Rule

This sub-folder contains a Script Include and a Business Rule for ServiceNow that provide utility methods for variable validation, logging, and transformation. It also demonstrates how to pass server-side information to the client side using the `g_scratchpad` variable.

## Components

### Script Include: `variableUtil`

Provides utility methods for:
- Validating a variable's existence (`validateVariable`)
- Logging variable states for debugging (`logVariable`)
- Validating a variable's type (`validateType`)
- Validating an array variable and its length (`validateArray`)
- Conditionally transforming a variable (`transformIfValid`)
- Validating and setting a variable with a fallback (`validateAndSet`)

### Business Rule: Display Business Rule

This Business Rule initializes the `g_scratchpad` variable and populates it with various server-side information. It utilizes the `variableUtil` Script Include for variable validation and logging.

## Usage Scenarios

1. **Server-Side Property Value**: You can apply logic based on some property value stored at the server side. For example, you might want to check a system property like `css.base.color` and pass it to the client side.

    ```javascript
    g_scratchpad.css = utilInstance.validateAndSet(gs.getProperty('css.base.color'), "Variable does not exist or has no value");
    ```

2. **User Information**: You can apply logic based on the department or manager associated with the user. For example, you might want to retrieve the manager of the caller and pass it to the client side.

    ```javascript
    g_scratchpad.managerName = utilInstance.validateAndSet(current.caller_id.manager.getDisplayValue(), "Variable does not exist or has no value");
    ```

## How to Use

1. Import the Script Include `variableUtil` into your ServiceNow instance.
2. Create a Display Business Rule and include the provided script.

## Logging Levels

The `logVariable` function supports different logging levels:
- `info`: General information
- `warn`: Warnings
- `error`: Errors (Throws an error)
