We are building a form in ServiceNow where a user must enter their phone number.
The requirement is that only valid Indian mobile numbers should be accepted. A valid number should:

Optionally start with 0 or 91

Be exactly 10 digits long

Start with digits 6, 7, 8, or 9

If the user enters anything invalid, the form should not be submitted, and an error message should be shown.

g_form.getValue → gets the phone field value.
Regex → allows numbers like 9876543210, 0919876543210, 919876543210.
Validation → If the value is invalid, shows alert and blocks submission.
