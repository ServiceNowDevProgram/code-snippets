# Form Field Masking

A powerful form field masking solution for ServiceNow Catalog Items that provides dynamic input formatting and sensitive data protection.

## Features

- Automatic input formatting
- Predefined mask patterns
- Sensitive data protection
- Dynamic mask detection
- Visual indicators for masked fields
- Toggle visibility for sensitive data
- Placeholder support
- Real-time mask application

## Supported Mask Types

1. Phone Numbers: `(###) ###-####`
2. Social Security Numbers: `###-##-####`
3. Credit Cards: `#### #### #### ####`
4. Dates: `##/##/####`
5. Currency: `$ ###,###.##`
6. IP Addresses: `###.###.###.###`

## Implementation

### Basic Setup

1. Create a new Catalog Client Script:
   ```javascript
   Table: Catalog Client Script [catalog_script_client]
   Type: Both onLoad and onChange
   Active: true
   ```

2. Copy the content of `script.js` into your script

### Configuring Field Masks

Two ways to configure masks:

1. **Automatic Detection**:
   - Fields are automatically masked based on their names
   - Example: fields containing "phone" will use phone number mask

2. **Manual Configuration**:
   ```javascript
   // Add a variable to your catalog item
   Name: fieldname_mask_type
   Type: String
   Value: phone|ssn|creditCard|date|currency|ipAddress
   ```

## Usage Examples

### Basic Field Masking
```javascript
// Phone number field will automatically format: (555) 123-4567
var masker = new FormFieldMasker();
masker.applyMask('phone_number', '5551234567');
```

### Sensitive Data Masking
```javascript
// SSN will be masked and get toggle visibility control
var masker = new FormFieldMasker();
masker.applyMask('ssn', '123456789');
```

## Customization

### Adding Custom Masks

```javascript
var masker = new FormFieldMasker();
masker.masks.customFormat = {
    pattern: '@@###',
    placeholder: '_',
    allowedChars: /[A-Za-z0-9]/
};
```

### Styling

Add these CSS classes to your style sheet:
```css
.sensitive-field {
    background-color: #f8f8f8;
}

.mask-sensitive {
    -webkit-text-security: disc;
}

.toggle-sensitive {
    cursor: pointer;
    margin-left: 5px;
}
```

## Technical Details

### Dependencies
- ServiceNow Platform UI Framework
- GlideForm API
- Prototype.js

### Browser Support
- Works with all modern browsers
- ES5+ compatible

## Best Practices

1. Performance
   - Efficient regex patterns
   - Optimized mask application
   - Minimal DOM manipulation

2. User Experience
   - Clear visual feedback
   - Intuitive mask patterns
   - Easy visibility toggling

3. Security
   - Proper handling of sensitive data
   - Client-side only masking
   - Clear security indicators

## Troubleshooting

Common issues and solutions:

1. Mask not applying
   - Verify field name matches mask type
   - Check console for errors
   - Confirm mask pattern is valid

2. Sensitive data handling
   - Ensure proper CSS classes
   - Verify toggle functionality
   - Check browser compatibility

## Version Information

- Compatible with ServiceNow: Rome and later
- Last Updated: October 2025