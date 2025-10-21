## Strong Username Validation Script
This script validates a username entered in a ServiceNow catalog item form. It prevents form submission if the username does not meet the required format.

### Validation Criteria
The username must start with a letter (a–z or A–Z).
It must be at least 6 characters long.
It can only contain letters and numbers.

## Usage
Add the script as an onSubmit client script in the catalog item. If the username is invalid, an error message is shown and the form is not submitted.
