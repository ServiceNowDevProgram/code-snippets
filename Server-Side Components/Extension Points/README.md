# Extension Points

## Overview

Extension Points in ServiceNow provide a powerful mechanism for creating extensible, plugin-based architectures. They allow you to define interfaces that can be implemented by multiple extensions, enabling dynamic behavior selection at runtime without modifying core code.

## What are Extension Points?

Extension Points follow the interface-implementation pattern where:
- **Extension Point (Interface)**: Defines a contract with methods that implementations must provide
- **Extensions (Implementations)**: Concrete classes that implement the interface methods
- **Consumer**: Code that discovers and invokes extensions dynamically using `GlideScriptedExtensionPoint`

This pattern is ideal for:
- Creating pluggable notification systems
- Building extensible validation frameworks
- Implementing strategy patterns
- Supporting multi-tenant customizations
- Enabling third-party integrations

## Files in this Directory

### 1. CustomNotificationHandlerInterfaceExtension.js
Defines the base interface (Extension Point) for notification handlers.

**Key Methods:**
- `initialize(record, config)`: Constructor for setting up the handler
- `process()`: Must be implemented - processes the notification
- `shouldNotify()`: Must be implemented - validates if notification should be sent
- `handles(notificationSystem)`: Determines if this implementation applies to a specific system

### 2. CustomNotificationHandlerInterfaceImplementation.js
Concrete implementation of the notification handler interface for email notifications.

**Features:**
- Email notification processing using `GlideEmailOutbound`
- Priority-based notification criteria
- Template-based subject and body generation
- Error handling and logging
- Configurable recipients and templates

### 3. ExtensionPointCallingExample.js
Demonstrates how to discover and invoke extension point implementations dynamically.

**Pattern:**
```javascript
var eps = new GlideScriptedExtensionPoint().getExtensions("scope.InterfaceName");
for (var i = 0; i < eps.length; i++) {
    if (eps[i].handles("criteria")) {
        eps[i].process();
    }
}
```

## How to Use Extension Points

### Step 1: Create the Extension Point (Interface)

Create a Script Include with the interface definition:

```javascript
var CustomNotificationHandlerInterface = Class.create();
CustomNotificationHandlerInterface.prototype = {
    initialize: function(record, config) {
        this.record = record;
        this.config = config || {};
    },
    
    process: function() {
        throw new Error('process() must be implemented by extension');
    },
    
    shouldNotify: function() {
        throw new Error('shouldNotify() must be implemented by extension');
    },
    
    handles: function(notificationSystem) {
        return notificationSystem == "DEFAULT";
    },
    
    type: 'CustomNotificationHandlerInterface'
};
```

**Important Configuration:**
- Set **API Name** to match the type (e.g., `CustomNotificationHandlerInterface`)
- Check **Client callable** if needed from client-side
- Set appropriate **Application** scope

### Step 2: Create Extension Point Record

1. Navigate to **System Definition > Extension Points**
2. Create a new Extension Point record:
   - **Name**: Descriptive name (e.g., "Custom Notification Handler Interface")
   - **API name**: Full scoped name (e.g., `x_snc_extension_p_0.CustomNotificationHandlerInterface`)
   - **Example implementation**: Reference your interface Script Include

### Step 3: Create Implementations (Extensions)

Create Script Includes that extend the interface:

```javascript
var EmailNotificationHandler = Class.create();
EmailNotificationHandler.prototype = Object.extendsObject(CustomNotificationHandlerInterface, {
    
    process: function() {
        // Implementation-specific logic
        var email = new GlideEmailOutbound();
        email.setSubject(this._buildSubject());
        email.setBody(this._buildBody());
        email.send();
        
        return { success: true, message: 'Email sent' };
    },
    
    shouldNotify: function() {
        // Custom validation logic
        return this.record.getValue('priority') <= 3;
    },
    
    handles: function(notificationSystem) {
        return notificationSystem == "Email";
    },
    
    type: 'EmailNotificationHandler'
});
```

### Step 4: Register Extensions

1. Navigate to **System Definition > Extensions**
2. Create Extension records for each implementation:
   - **Extension point**: Select your Extension Point
   - **Name**: Implementation name
   - **Implementation**: Reference your implementation Script Include

### Step 5: Invoke Extensions Dynamically

Use `GlideScriptedExtensionPoint` to discover and execute extensions:

```javascript
// Get all extensions for the interface
var eps = new GlideScriptedExtensionPoint().getExtensions("x_snc_extension_p_0.CustomNotificationHandlerInterface");

// Iterate and invoke matching extensions
for (var i = 0; i < eps.length; i++) {
    gs.info("Checking extension: " + eps[i].type);
    
    if (eps[i].handles("Email")) {
        var result = eps[i].process();
        gs.info("Result: " + JSON.stringify(result));
    }
}
```

## Best Practices

### 1. Interface Design
- Define clear contracts with well-documented methods
- Use JSDoc comments for all interface methods
- Throw errors for unimplemented required methods
- Provide sensible defaults in the base interface

### 2. Implementation Guidelines
- Always implement all required interface methods
- Use the `handles()` method to control when implementation applies
- Include comprehensive error handling
- Return consistent result objects
- Log important operations for debugging

### 3. Naming Conventions
- Use descriptive names for Extension Points
- Follow ServiceNow naming standards
- Include scope prefix in API names
- Use consistent naming across interface and implementations

### 4. Performance Considerations
- Cache extension instances when possible
- Avoid heavy processing in `handles()` method
- Use early returns to skip unnecessary processing
- Consider lazy initialization for expensive resources

### 5. Testing
- Test each implementation independently
- Verify `handles()` logic with various inputs
- Test error handling and edge cases
- Validate behavior when no extensions match

## Common Use Cases

### 1. Multi-Channel Notifications
Create extensions for Email, SMS, Slack, Teams, etc., all implementing a common notification interface.

### 2. Validation Frameworks
Build extensible validation systems where different validators can be plugged in based on record type or business rules.

### 3. Data Transformation
Implement multiple transformation strategies that can be selected dynamically based on data source or format.

### 4. Integration Adapters
Create adapters for different external systems, all conforming to a common integration interface.

### 5. Approval Workflows
Build flexible approval mechanisms where different approval strategies can be applied based on conditions.

## Troubleshooting

### Extensions Not Found
- Verify Extension Point API name matches exactly
- Check that Extension records are active
- Ensure Script Includes are in the correct application scope
- Verify no typos in scope prefix

### Methods Not Executing
- Confirm `handles()` method returns true for your criteria
- Check for errors in implementation code
- Verify Script Include is set to correct type
- Review logs for error messages

### Performance Issues
- Reduce number of extensions if possible
- Optimize `handles()` method logic
- Consider caching extension instances
- Profile code to identify bottlenecks

## Additional Resources

- [ServiceNow Extension Points Documentation](https://docs.servicenow.com)
- [GlideScriptedExtensionPoint API Reference](https://developer.servicenow.com/dev.do#!/reference/api/latest/server/no-namespace/c_GlideScriptedExtensionPointScopedAPI)
- [Script Includes Best Practices](https://developer.servicenow.com/dev.do#!/learn/learning-plans/tokyo/new_to_servicenow/app_store_learnv2_scripting_tokyo_script_includes)

## Example Scenarios

### Scenario 1: Priority-Based Email Notifications
Use the provided implementation to send email notifications only for high-priority incidents (priority 1-3).

### Scenario 2: Multi-System Notification Router
Create multiple implementations (Email, SMS, Slack) and route notifications based on user preferences or incident severity.

### Scenario 3: Custom Business Logic
Extend the interface to add custom validation rules, approval logic, or data transformation specific to your organization.

## Contributing

When adding new Extension Point examples:
1. Include both interface and at least one implementation
2. Provide clear documentation in code comments
3. Add usage examples
4. Include screenshots of configuration if helpful
5. Follow the repository's code quality standards
