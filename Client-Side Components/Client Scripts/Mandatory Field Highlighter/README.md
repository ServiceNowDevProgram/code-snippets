# Mandatory Field Highlighter

## Use Case
Provides visual feedback for empty mandatory fields on ServiceNow forms by showing error messages when the form loads. Helps users quickly identify which required fields need to be completed.

## Requirements
- ServiceNow instance
- Client Script execution rights
- Forms with mandatory fields

## Implementation
1. Create a new Client Script with Type "onLoad"
2. Copy the script code from script.js
3. Apply to desired table/form
4. Save and test on a form with mandatory fields

## Features
- Shows error messages under empty mandatory fields on form load
- Uses proper ServiceNow client scripting APIs
- No DOM manipulation or unsupported methods
- Lightweight and focused functionality

## Notes
- Uses g_form.showFieldMsg() method to display error messages
- Only runs on form load - no real-time updates
- Works with all mandatory fields automatically
- Simple single-script solution