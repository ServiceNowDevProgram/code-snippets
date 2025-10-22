# ServiceNow Email Validation Catalog Client Script

## Overview
Client-side validation script for ServiceNow catalog items to ensure proper email format in user input fields.

## Features
- Real-time email format validation
- Form submission prevention for invalid emails
- User-friendly error messages
- Standard email pattern validation

## Implementation
1. Navigate to **Service Catalog > Catalog Client Scripts**
2. Create new script and select catalog item
3. Choose script type: **onSubmit** or **onChange**
4. Replace `email_field_name` with your field variable name
5. Save and activate

## Validation Rules
- Required format: `user@domain.com`
- Accepts: letters, numbers, dots, underscores, hyphens
- Minimum 2-character domain extension

## Script Types
- **onSubmit**: Validates before form submission
- **onChange**: Real-time validation as user types

## Usage
Best practice: Use both scripts for comprehensive validation and better user experience.
