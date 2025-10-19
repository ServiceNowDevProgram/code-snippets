Client Script – Validate Short Description
Overview

This client script validates the Short Description field before a record is submitted. It ensures that the field:

Does not exceed 100 characters.

Does not contain any special characters (only letters, numbers, and spaces are allowed).

This helps maintain data quality, consistency, and readability in incident records or any other relevant table.

How It Works

On form submission, the script checks the short_description field.

If the description is too long or contains invalid characters, the submission is blocked.

An error message is displayed, and the problematic field can be optionally highlighted.

Configuration

Navigate to System Definition → Client Scripts.

Create a new client script.

Set the following properties:

Table: Incident (or the target table)

Type: onSubmit

Active: Checked

Paste the following script into the Script field.
