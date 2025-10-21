Whitespace Validation — Client Script (ServiceNow)
Overview

This Client Script ensures that a field does not contain any whitespace characters. It validates user input in real-time and provides immediate feedback by displaying an inline error message directly below the field. Invalid input is cleared automatically to enforce proper data entry.

Features

Prevents any spaces in the field value.

Displays field-level error messages below the input field.

Automatically clears invalid input for user correction.

Simple, lightweight, and does not use regex or getLabelOf.

Works dynamically for any field where the Client Script is applied.

Usage Instructions
1. Create the Client Script

Navigate to System Definition → Client Scripts.

Click New to create a new Client Script.

2. Configure the Script

Name: Whitespace Validation

Table: Select the target table (e.g., sys_user)

Type: onChange

Field: Select the field to validate (e.g., username, phone)

Active: Check this box
