# Word Counter Display

## Use Case
Provides real-time word count feedback for text fields in ServiceNow forms. Shows current word count against maximum limit in "X out of Y words" format with visual indicators to help users stay within word limits.

## Requirements
- ServiceNow instance
- Client Script execution rights
- Text fields requiring word count validation

## Implementation
1. Create a new Client Script with Type "onChange"
2. Copy the script code from `script.js`
3. Configure the field name and word limit in the script
4. Apply to desired table/form
5. Save and test

## Configuration
Edit these variables in the script:

```javascript
var fieldName = 'short_description';  // Your field name
var maxWords = 25;                    // Your word limit
```

## Features
- Real-time word counting as user types
- Visual indicators: info (blue), warning (yellow), error (red)
- Shows "X out of Y words" format with status messages
- Automatically trims whitespace and handles multiple spaces
- Automatically clears previous messages

## Common Examples
```javascript
// Short Description (25 words)
var fieldName = 'short_description';
var maxWords = 25;

// Description (500 words)
var fieldName = 'description';
var maxWords = 500;

// Work Notes (200 words)
var fieldName = 'work_notes';
var maxWords = 200;

// Comments (300 words)
var fieldName = 'comments';
var maxWords = 300;

// Close Notes (100 words)
var fieldName = 'close_notes';
var maxWords = 100;
```

## Message Thresholds
- **10+ words remaining**: Info message (blue)
- **1-5 words remaining**: Warning message (yellow) - "Approaching limit"
- **Over limit**: Error message (red) - "Limit exceeded"

## Notes
- Uses standard ServiceNow APIs: `g_form.addInfoMessage()` and `g_form.hideFieldMsg()`
- Create separate Client Scripts for multiple fields
- Works with all text fields and text areas
- Word count excludes extra whitespace and empty strings
- Counts words by splitting text on space boundaries after trimming