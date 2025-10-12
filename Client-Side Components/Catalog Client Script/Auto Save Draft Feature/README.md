# Auto Save Draft Feature for Catalog Items

This snippet provides automatic draft saving functionality for ServiceNow Catalog Items, helping prevent data loss by automatically saving form data at regular intervals.

## Overview

The feature includes two implementations:
1. Basic Implementation (`basic_implementation.js`)
2. Advanced Implementation (`advanced_implementation.js`)

## Basic Implementation

### Features
- Auto-saves form data every minute
- Stores single draft in sessionStorage
- Provides draft restoration on form load
- Basic error handling and user feedback

### Usage
```javascript
// Apply in Catalog Client Script
// Select "onLoad" for "Client script runs"
// Copy content from basic_implementation.js
```

## Advanced Implementation

### Enhanced Features
- Multiple draft support (keeps last 3 drafts)
- Advanced draft management
- Draft selection dialog
- Detailed metadata tracking
- Improved error handling
- User-friendly notifications

### Usage
```javascript
// Apply in Catalog Client Script
// Select "onLoad" for "Client script runs"
// Copy content from advanced_implementation.js
```

## Technical Details

### Dependencies
- ServiceNow Platform UI Framework
- GlideForm API
- GlideModal (advanced implementation only)

### Browser Support
- Modern browsers with sessionStorage support
- ES5+ compatible

### Security Considerations
- Uses browser's sessionStorage (cleared on session end)
- No sensitive data transmission
- Instance-specific storage

## Implementation Guide

1. Create a new Catalog Client Script:
   - Table: Catalog Client Script [catalog_script_client]
   - Type: onLoad
   - Active: true

2. Choose implementation:
   - For basic needs: Copy `basic_implementation.js`
   - For advanced features: Copy `advanced_implementation.js`

3. Apply to desired Catalog Items:
   - Select applicable Catalog Items
   - Test in dev environment first

## Best Practices

1. Testing:
   - Test with various form states
   - Verify draft restoration
   - Check browser storage limits

2. Performance:
   - Default 60-second interval is recommended
   - Adjust based on form complexity
   - Monitor browser memory usage

3. User Experience:
   - Clear feedback messages
   - Confirmation dialogs
   - Error notifications

## Limitations

- Browser session dependent
- Storage size limits
- Form field compatibility varies

## Troubleshooting

Common issues and solutions:
1. Draft not saving
   - Check browser console for errors
   - Verify sessionStorage availability
   - Check form modification detection

2. Restoration fails
   - Validate stored data format
   - Check browser storage permissions
   - Verify form field compatibility

## Version Information

- Compatible with ServiceNow: Rome and later
- Browser Requirements: Modern browsers with ES5+ support
- Last Updated: October 2025