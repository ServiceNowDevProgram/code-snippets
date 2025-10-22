# ServiceNow Email Validation - onSubmit Script

## Overview
Email validation client script for ServiceNow catalog items that checks the email format when the user submits a form. This ensures that only valid email addresses are submitted and helps maintain data accuracy.

## Features
- Validates email during form submission
- Displays clear error messages near the field
- User-friendly feedback with examples
- Lightweight and client-side — no server calls required

## Implementation
1. Navigate to **Service Catalog > Catalog Client Scripts**
2. Click **New** to create a new script
3. Select your **Catalog Item**
4. Set **Type** to **onSubmit**
5. Set **Variable name** to your email field variable
6. Set UI Type to All
7. Replace `email_field_name` with actual variable name in script
8. Paste the script code
9. Check **Active** checkbox
10. Save

## Validation Rules
- Required format: `user@domain.com`
- Accepts: letters, numbers, dots (.), underscores (_), hyphens (-)
- Minimum 2-character top-level domain

## User Experience
- **Invalid Input**: Red error message displayed below field
- **Valid Input**: Form submission proceeds normally
- **Empty Field**: No validation performed
- **While Loading**: No validation triggered

## Benefits
- Prevents submission of incorrect email formats
- Provides errors(if any) before form submission
- Improves data quality
- Enhances overall user experience
