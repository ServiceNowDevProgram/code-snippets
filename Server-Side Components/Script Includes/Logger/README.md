This is the logger module which can be used to log Payloads easily in a more efficient way. This module can be controlled from properties.

Here's an explanation of the key components and methods of this `Logger` Script Include:

1. **Constructor (`initialize` method)**:
   - The constructor function `initialize` is used to create instances of the `Logger` class.
   - It takes one parameter called `source`, which is intended to be a string representing the source or context for the logs.
   - Inside the constructor, it initializes instance variables:
     - `this.logging_enabled`: This variable is set by fetching a ServiceNow property based on the provided `source`. It's used to determine whether logging is enabled for this specific source.
     - `this.payload_logging_enabled`: Similar to `this.logging_enabled`, this variable is set to determine whether payload (API requests) logging is enabled for the source.
     - `this.source`: This variable is set to the provided `source` parameter, representing the context for the logs.
     - In order to manage the Logger through properties you should create two properties for "Text Logger" & another one is for "Payload Logger" with type "TRUE/FALSE". So that those properties can be utilised to manage enable or disable to logs in all the scripts for better performance. 

2. **Logging Methods**:
   - The `Logger` class defines several methods for different types of logging:
     - `infoLog(description)`: Logs an informational message with the provided `description` if logging is enabled.
     - `warnLog(description)`: Logs a warning message with the provided `description` if logging is enabled.
     - `errorLog(description)`: Logs an error message with the provided `description` if logging is enabled.
     - `logPayload(description)`: Logs payload information with the provided `description` if payload logging is specifically enabled for this source.

3. **Conditional Logging**:
   - Before logging any message (info, warning, error, or payload), each method checks if logging or payload logging is enabled for the current source by comparing the `this.logging_enabled` or `this.payload_logging_enabled` variable to the string `"true"`.
   - If logging is enabled, it uses the `gs.log()`, `gs.logWarning()`, or `gs.logError()` functions to log the message with the source context.

4. **Class Type**:
   - The class has a `type` property set to `'Logger'`, which could be used for type checking or identifying objects of this class.

To use this `Logger` class, you would typically do the following:

1. Instantiate a `Logger` object with a specific `source` when you need to log information, warnings, errors, or payload details in your ServiceNow script.

2. Use the appropriate logging method (e.g., `infoLog`, `warnLog`, `errorLog`, or `logPayload`) to log messages as needed within your script. The class takes care of checking whether logging is enabled for that source/context.

Here's an example of how you might use it in a ServiceNow script:

```javascript
// Instantiate a Logger for a specific source (e.g., "LogicMonitor")
var myLogger = new Logger("LogicMonitor");

// Log information
myLogger.infoLog("This is an informational message");

// Log a warning
myLogger.warnLog("This is a warning message");

// Log an error
myLogger.errorLog("This is an error message");

// Log payload (if enabled)
myLogger.logPayload("API request payload: {...}");
```

This code ensures that log messages are only recorded if logging or payload logging is explicitly enabled for the specified source.
