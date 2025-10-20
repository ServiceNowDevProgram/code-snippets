# Field Progress Bar Counter

## Overview
This client script adds a visual progress bar indicator when users type in text fields, showing how much of the field's maximum length has been used. It provides a more intuitive way to track character limits compared to simple numeric counters.

## Features
- Visual progress bar that updates in real-time
- Color-coded feedback (green, yellow, red) based on usage
- Percentage indicator alongside the progress bar
- Smooth transitions between states
- Works with any text field with a character limit

## Requirements
- ServiceNow instance
- Client Script execution rights
- Text fields with character limits (e.g., short_description, description)

## Implementation Steps
1. Navigate to System Definition → Client Scripts
2. Create a new Client Script with these settings:
   - Table: Choose your target table (e.g., incident, sc_req_item)
   - Type: onChange
   - Field name: Your target field (e.g., short_description)
3. Copy the code from script.js into your client script
4. Configure the maxLength variable if needed
5. Save and test

## Configuration
The script can be customized by modifying these variables:
```javascript
var maxLength = 160; // Maximum characters allowed
var warningThreshold = 0.7; // Show yellow at 70% capacity
var criticalThreshold = 0.9; // Show red at 90% capacity
```

## How It Works
1. The script creates a progress bar div element below the field
2. As the user types, it calculates the percentage of used characters
3. The progress bar fills proportionally to character usage
4. Colors change based on defined thresholds:
   - Green: Normal usage
   - Yellow: Approaching limit
   - Red: Near/at limit

## Benefits
- Improved user experience with visual feedback
- Reduces likelihood of hitting character limits unexpectedly
- Helps users self-regulate content length
- Modern, professional appearance
- Zero server calls - all client-side

## Usage Example
When implementing on an Incident's short description:
```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === oldValue) {
        return;
    }
    showProgressBar(control, newValue);
}
```

## Compatibility
- Works in all modern browsers
- Compatible with both classic and next-experience UIs
- Responsive design adapts to field width
