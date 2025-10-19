# Smart Form Validation for Catalog Items

This snippet provides intelligent form validation functionality for ServiceNow Catalog Items with real-time feedback and custom validation rules.

## Overview

The feature includes two implementations:
1. Basic Implementation (`basic_implementation.js`)
2. Advanced Implementation (`advanced_implementation.js`)

## Basic Implementation

### Features
- Real-time field validation
- Common validation rules (email, phone, number, date)
- Field-specific error messages
- Form-level validation

### Usage
```javascript
// Apply in Catalog Client Script
// Select both "onChange" and "onSubmit" for "Client script runs"
// Copy content from basic_implementation.js
```

## Advanced Implementation

### Enhanced Features
- All basic features
- Custom validation rules
- Field dependencies
- Validation history (undo/redo support)
- Validation summary dialog
- Working hours validation
- Password strength checking
- Future date validation

### Usage
```javascript
// Apply in Catalog Client Script
// Select both "onChange" and "onSubmit" for "Client script runs"
// Copy content from advanced_implementation.js
```

## Technical Details

### Dependencies
- ServiceNow Platform UI Framework
- GlideForm API
- GlideModal (advanced implementation)

### Validation Rules
1. Basic Rules:
   - Email validation
   - Phone number format
   - Numeric values
   - Date format

2. Advanced Rules:
   - Password strength
   - Future dates
   - Working hours
   - Custom dependencies

## Implementation Guide

1. Create a new Catalog Client Script:
   - Table: Catalog Client Script [catalog_script_client]
   - Type: Both onChange and onSubmit
   - Active: true

2. Choose implementation:
   - For basic needs: Copy `basic_implementation.js`
   - For advanced features: Copy `advanced_implementation.js`

3. Configure Rules:
   - Modify existing rules
   - Add custom validation rules
   - Set up field dependencies

## Best Practices

1. Performance:
   - Use appropriate validation timing
   - Cache validation results
   - Optimize regular expressions

2. User Experience:
   - Clear error messages
   - Immediate feedback
   - Helpful validation summaries

3. Maintenance:
   - Document custom rules
   - Keep validation logic organized
   - Regular expression testing

## Limitations

- Browser compatibility considerations
- Form field type restrictions
- Performance with many fields

## Troubleshooting

Common issues and solutions:
1. Validation not triggering
   - Check event handlers
   - Verify field types
   - Console for errors

2. Custom rules not working
   - Validate rule syntax
   - Check field values
   - Test regular expressions

## Version Information

- Compatible with ServiceNow: Rome and later
- Browser Requirements: Modern browsers
- Last Updated: October 2025