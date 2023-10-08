# ServiceNow Variable Utilities and Business Rule

This sub-folder contains a Script Include and a Business Rule for ServiceNow. These components offer enhanced capabilities for variable validation, logging, and transformation. The Business Rule also initializes and populates the `g_scratchpad` object with server-side information, making it accessible on the client side.

## Components

### Script Include: `variableUtil`

This Script Include provides a set of utility methods for:

- **Variable Existence Validation**: Ensures that a variable is neither `null` nor `undefined` using `validateVariable`.
- **Variable State Logging**: Logs the state of variables for debugging purposes with different log levels using `logVariable`.
- **Type Validation**: Validates the data type of a variable using `validateType`.
- **Array Validation**: Validates if a variable is an array and optionally checks its length using `validateArray`.
- **Conditional Transformation**: Applies a transformation function to a variable if it's valid using `transformIfValid`.
- **Variable Initialization with Fallback**: Validates and sets a variable, providing a fallback value if the variable is invalid using `validateAndSet`.

### Business Rule: Display Business Rule

This Business Rule is designed to initialize the `g_scratchpad` object and populate it with specific server-side variables. It leverages the `variableUtil` Script Include for robust variable validation and logging.

## Usage Scenarios

1. **Server-Side Property Value**: Utilize server-side properties like `css.base.color` to influence client-side behavior.
    ```javascript
    g_scratchpad.css = utilInstance.validateAndSet(gs.getProperty('css.base.color'));
    ```

2. **User-Related Information**: Extract and use information related to the user, such as the manager's name, to customize the user experience.
    ```javascript
    g_scratchpad.managerName = utilInstance.validateAndSet(current.caller_id.manager.getDisplayValue());
    ```

## How to Use

1. Import the `variableUtil` Script Include into your ServiceNow instance.
2. Create a new Display Business Rule and incorporate the script from this repository.

## Logging Levels

The `logVariable` function in the Script Include supports different logging levels to categorize the log entries:
- `info`: For general informational logs.
- `warn`: For warning messages.
- `error`: For error messages, also throws an error to halt execution.

