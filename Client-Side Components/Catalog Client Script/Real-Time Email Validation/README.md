# ServiceNow Email Validation - onChange Script

## Overview
Real-time email validation script for ServiceNow catalog items that provides instant feedback as users type in email fields.

## Features
- Real-time validation during user input
- Instant error/success messages
- Dynamic message clearing based on validity
- User-friendly feedback with examples
- No form submission required for validation

## Implementation
1. Navigate to **Service Catalog > Catalog Client Scripts**
2. Click **New** to create a new script
3. Select your **Catalog Item**
4. Set **Type** to **onChange**
5. Set **Variable name** to your email field variable
6. Replace `email_field_name` with actual variable name in script
7. Paste the script code
8. Check **Active** checkbox
9. Save

## Validation Rules
- Required format: `user@domain.com`
- Accepts: letters, numbers, dots (.), underscores (_), hyphens (-)
- Minimum 2-character top-level domain

## User Experience
- **Invalid Input**: Red error message displayed below field
- **Valid Input**: Green info message confirming valid format
- **Empty Field**: No validation performed
- **While Loading**: Validation skipped to prevent false errors

## Benefits
- Immediate feedback reduces user frustration
- Prevents errors before form submission
- Improves data quality
- Enhances overall user experience
