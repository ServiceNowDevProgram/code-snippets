Auto-Populate Short Description (Client Script)
Overview

This client script automatically updates the Short Description field in ServiceNow whenever a user selects a category on the form. It improves data consistency, saves time, and ensures that short descriptions remain meaningful and standardized.

How It Works

When a user selects a category such as Hardware, Software, or Network, the script automatically prefixes the existing short description with a corresponding label (for example, “Hardware Issue –”).
This makes incident records easier to identify and improves the quality of data entry.

Configuration Steps

Log in to your ServiceNow instance with admin or developer access.

Navigate to System Definition → Client Scripts.

Create a new Client Script with the following details:

Table: Incident

Type: onChange

Field name: category

Copy and paste the provided script into the Script field.

Save the record and make sure the script is active.

Testing

Open any existing or new Incident record.

Select a category such as Hardware or Software.

The Short Description field will automatically update with the corresponding prefix.

Benefits

Speeds up data entry for users.

Maintains consistency in short descriptions.

Reduces manual effort and human errors.

Enhances clarity in incident listings and reports.
