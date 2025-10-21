Phone Number Validation — Client Script (ServiceNow)
Overview

This Client Script ensures that users enter their phone numbers in a strict format: (123) 456-7890.
It is triggered whenever the Phone field changes and validates the input in real time.

If the input does not match the required format, the script:

Clears the invalid value.

Displays a field-level error message directly below the field.

Provides a fallback alert if field-level messaging is unavailable.

This script is designed to be user-friendly, dynamic, and failsafe.

Features

Validates phone numbers in the format (123) 456-7890.

Inline error messages appear directly below the field, avoiding top-of-page clutter.

Clears invalid input to prevent incorrect data submission.

Works dynamically for any phone field with minimal configuration.

Provides fallback alert for environments where inline messages are unavailable.

Usage Instructions
1. Create the Client Script

Navigate to System Definition → Client Scripts.

Click New to create a client script.

2. Configure the Script

Name: Phone Number Validation

Table: sys_user 

Type: onChange

Field: phone

Active: Checked
