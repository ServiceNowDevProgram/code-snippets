# Mandatory Field Highlighter

## Use Case / Requirement
Highlight mandatory fields that are empty by showing error messages, making it easier for users to identify which required fields need to be completed.

## Solution
Two client scripts that work together:
1. **onLoad script**: Shows error messages for empty mandatory fields when form loads
2. **onChange script**: Updates error messages in real-time as users fill fields
3. Uses proper ServiceNow methods instead of DOM manipulation

## Implementation
1. **Create onLoad script**: 
   - New Client Script, Type: onLoad
   - Copy code from `script.js`
   - Apply to desired table

2. **Create onChange script(s)**:
   - New Client Script, Type: onChange
   - Copy code from `onChange.js`
   - **Important**: Replace `'FIELD_NAME'` with actual field name (e.g., 'priority')
   - Create separate onChange scripts for each mandatory field you want to validate
   - Set the "Field name" in the client script form to the specific field

## Files
- `script.js`: onLoad client script for initial highlighting
- `onChange.js`: onChange template script for real-time updates

## Example Usage
For priority field onChange script:
```javascript
var fieldName = 'priority'; // Replace FIELD_NAME with 'priority'
```

For category field onChange script:
```javascript  
var fieldName = 'category'; // Replace FIELD_NAME with 'category'
```

## Notes
- Uses `g_form.showFieldMsg()` and `g_form.hideFieldMsg()` methods
- Follows ServiceNow best practices (no DOM manipulation)
- Works with standard ServiceNow forms
- Create one onChange script per mandatory field for best results