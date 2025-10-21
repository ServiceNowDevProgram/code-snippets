Numeric-Only Field Validation — Client Script (ServiceNow)
Overview

This Client Script validates that a specific field contains numbers only on ServiceNow forms.
If the user enters non-numeric characters, it:

Resets the field to the previous valid value.

Displays an inline error message directly below the field.

Ensures previous error messages are cleared to avoid duplicates.

This script works in Classic UI forms and safely handles environments where certain g_form APIs may not be available.

Features

Validates input dynamically as the user types (OnChange).

Resets invalid input to previous value.

Shows a clear, field-level error message: "Please enter numbers only".

Avoids displaying messages at the top of the form.

Compatible with instances where g_form.showFieldMsg, g_form.hideFieldMsg, or g_form.setValue may not exist.

Usage Instructions
1. Create the Client Script

Navigate to System Definition → Client Scripts.

Click New to create a client script.

2. Configure the Script

Name: Numeric-Only Validation

Table: Choose the table you want to validate (e.g., incident).

Type: onChange

Field: The field you want to validate (e.g., short_description).

Active: Checked
