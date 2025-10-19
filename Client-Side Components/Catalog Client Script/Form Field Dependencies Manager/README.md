# Form Field Dependencies Manager

A powerful utility for managing complex field relationships and dependencies in ServiceNow Catalog Items.

## Features

- Dynamic field relationships
- Cascading field updates
- Conditional visibility rules
- Dynamic mandatory field rules
- Value mapping between fields
- Dependency chain tracking
- Error handling and logging

## Types of Dependencies

1. **Cascading Changes**
   - Update dependent fields automatically
   - Complex value calculations
   - Multi-field dependencies

2. **Visibility Rules**
   - Show/hide fields based on conditions
   - Multiple condition support
   - Complex visibility logic

3. **Mandatory Rules**
   - Dynamic required field handling
   - Condition-based mandatory flags
   - Multiple rule support

4. **Value Mappings**
   - Automatic value population
   - Complex value transformations
   - Multi-field mapping support

## Implementation

### Basic Setup

1. Create a new Catalog Client Script:
   ```javascript
   Table: Catalog Client Script [catalog_script_client]
   Type: Both onLoad and onChange
   Active: true
   ```

2. Copy the content of `script.js` into your script

### Configuration Examples

1. **Cascading Update**
```javascript
var manager = new FieldDependenciesManager();
manager.addDependency({
    type: 'cascade',
    sourceField: 'department',
    targetField: 'assignment_group',
    rule: function(value, cache) {
        // Return assignment group based on department
        return departmentToGroupMapping[value] || '';
    }
});
```

2. **Visibility Rule**
```javascript
manager.addDependency({
    type: 'visibility',
    sourceField: 'category',
    targetField: 'subcategory',
    rule: function(value, cache) {
        return value === 'hardware' || value === 'software';
    }
});
```

3. **Mandatory Field Rule**
```javascript
manager.addDependency({
    type: 'mandatory',
    sourceField: 'impact',
    targetField: 'priority',
    rule: function(value, cache) {
        return value === 'high';
    }
});
```

4. **Value Mapping**
```javascript
manager.addDependency({
    type: 'valueMap',
    sourceField: 'country',
    targetField: 'currency',
    rule: function(value, cache) {
        return countryCurrencyMap[value] || 'USD';
    }
});
```

## Technical Details

### Dependencies
- ServiceNow Platform UI Framework
- GlideForm API

### Performance Considerations
- Efficient caching mechanism
- Optimized dependency processing
- Circular dependency prevention

### Browser Support
- Works with all modern browsers
- ES5+ compatible

## Best Practices

1. **Performance**
   - Group related dependencies
   - Use efficient rules
   - Avoid complex calculations

2. **Maintenance**
   - Document dependencies
   - Use meaningful rule names
   - Keep rules simple

3. **User Experience**
   - Clear field relationships
   - Immediate feedback
   - Logical dependencies

## Troubleshooting

Common issues and solutions:

1. **Dependencies not triggering**
   - Check rule configuration
   - Verify field names
   - Check console for errors

2. **Circular Dependencies**
   - Review dependency chain
   - Check log output
   - Simplify relationships

3. **Performance Issues**
   - Optimize rule calculations
   - Reduce dependency complexity
   - Check browser console

## Example Use Cases

1. **IT Request Form**
```javascript
// Hardware request dependencies
manager.addDependency({
    type: 'cascade',
    sourceField: 'hardware_type',
    targetField: 'model',
    rule: function(value, cache) {
        return getModelsForHardwareType(value);
    }
});
```

2. **HR Service Catalog**
```javascript
// Leave request dependencies
manager.addDependency({
    type: 'mandatory',
    sourceField: 'leave_type',
    targetField: 'return_date',
    rule: function(value, cache) {
        return value === 'extended_leave';
    }
});
```

## Version Information

- Compatible with ServiceNow: Rome and later
- Last Updated: October 2025