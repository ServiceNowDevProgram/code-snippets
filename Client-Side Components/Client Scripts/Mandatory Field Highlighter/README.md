# Mandatory Field Highlighter

## Use Case / Requirement
Highlight mandatory fields that are empty by showing error messages, making it easier for users to identify which required fields need to be completed.

## Solution
Two client scripts that work together:
1. **onLoad script**: Shows error messages for empty mandatory fields when form loads
2. **onChange script**: Updates error messages in real-time as users fill fields
3. Uses proper ServiceNow methods instead of DOM manipulation

## Implementation
1. Create an **onLoad** client script with the code from `script.js`
2. Create an **onChange** client script with the code from `onChange.js`
3. Apply both scripts to the same table/form

## Files
- `script.js`: onLoad client script for initial highlighting
- `onChange.js`: onChange client script for real-time updates

## Notes
- Uses `g_form.showFieldMsg()` and `g_form.hideFieldMsg()` methods
- Follows ServiceNow best practices (no DOM manipulation)
- Works with standard ServiceNow forms
- Provides clear error messages for required fields