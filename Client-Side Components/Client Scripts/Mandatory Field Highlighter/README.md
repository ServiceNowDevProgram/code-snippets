# Mandatory Field Highlighter

## Use Case / Requirement
Visually highlight mandatory fields that are empty by adding a red border, making it easier for users to identify which required fields need to be completed.

## Solution
An onLoad client script that:
- Identifies all mandatory fields on the form
- Adds red border styling to empty mandatory fields
- Updates styling when fields are filled
- Provides visual feedback to improve user experience

## Implementation
Add this as an **onLoad** client script on any form where you want to highlight mandatory fields.

## Notes
- Only highlights empty mandatory fields
- Removes highlighting when fields are filled
- Uses CSS border styling for visual emphasis
- Works with standard ServiceNow forms