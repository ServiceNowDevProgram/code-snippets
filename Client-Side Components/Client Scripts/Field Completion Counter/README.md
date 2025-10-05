# Field Completion Counter

## Use Case / Requirement
Display a simple message showing how many fields are completed vs total fields on a form. This helps users track their progress while filling out forms.

## Solution
A simple onLoad client script that:
- Counts filled vs empty fields
- Shows completion status in an info message
- Updates when fields are modified

## Implementation
Add this as an **onLoad** client script on any form.

## Notes
- Excludes system fields and read-only fields
- Updates in real-time as users fill fields
- Simple and lightweight solution