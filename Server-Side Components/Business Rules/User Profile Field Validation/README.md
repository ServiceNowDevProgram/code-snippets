# Overview
This JavaScript code snippet is designed to validate user profile fields in ServiceNow before submission. It is particularly useful for ServiceNow developers looking to implement robust data validation mechanisms in user profiles.

# How It Works
The snippet uses a business rule that executes on form submission to validate user input:
- **Regular Expressions**: It utilizes regex patterns to check the format of the `phone` and `email` fields.
- **Error Messaging**: If the validation fails, an error message is displayed to the user, and the submission is aborted. 

# Implementation
- **Add to a Business Rule**: This snippet should be incorporated into a business rule configured to run on the user profile table.
- **Adjust Validation Patterns**: Modify the `phoneNumberPattern` and `emailPattern` variables to align with your specific requirements (e.g: international phone formats).