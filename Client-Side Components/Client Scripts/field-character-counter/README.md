# Field Character Counter

## Use Case
Provides real-time character count feedback for text fields in ServiceNow forms. Shows remaining characters with visual indicators to help users stay within field limits.

## Requirements
- ServiceNow instance
- Client Script execution rights
- Text fields with character limits

## Implementation
1. Create a new Client Script with Type "onChange"
2. Copy the script code from `script.js`
3. Configure the field name and character limit in the script
4. Apply to desired table/form
5. Save and test

## Configuration
Edit these variables in the script:

```javascript
var fieldName = 'short_description';  // Your field name
var maxLength = 160;                  // Your character limit
```

## Features
- Real-time character counting as user types
- Visual indicators: info (blue), warning (yellow), error (red)
- Shows "X characters remaining" or "Exceeds limit by X characters"
- Automatically clears previous messages

## Common Examples
```javascript
// Short Description (160 chars)
var fieldName = 'short_description';
var maxLength = 160;

// Description (4000 chars)
var fieldName = 'description';
var maxLength = 4000;

// Work Notes (4000 chars)
var fieldName = 'work_notes';
var maxLength = 4000;
```

## Message Thresholds
- **50+ remaining**: Info message (blue)
- **1-20 remaining**: Warning message (yellow)
- **Over limit**: Error message (red)

## Notes
- Uses standard ServiceNow APIs: `g_form.showFieldMsg()` and `g_form.hideFieldMsg()`
- Create separate Client Scripts for multiple fields
- Works with all text fields and text areas
- Character count includes all characters (spaces, punctuation, etc.)