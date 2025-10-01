# Redact Sensitive Information

When users create an incident or HR case via the self-service portal, they may occasionally enter sensitive information (e.g., personal identifiers, account numbers). 
To prevent misuse of such data, **fulfillers** can redact sensitive information from the short description or description fields.

This ensures that confidential information is safeguarded and not accessible for unauthorized use or distribution.

## Prerequisites

1. Custom Field:
    Add a custom field to the form to hold the redacted text.
    Example: u_redact (Redact).
   
2. OnSubmit Client Script:
    Create an onsubmit client script to redact sensitive information.
    This script will update the **short description** and **description** field with custom value as required.

**Note**: Data that has been redacted cannot be recovered.
