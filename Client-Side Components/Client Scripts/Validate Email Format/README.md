onSubmit Function: This client script validates the email format when the form is submitted.
Regular Expression: It uses a comprehensive email regex pattern to check if the entered email matches a standard email format.

This pattern can handles:
- Quoted local parts (`"john doe"@example.com`)
- Dots within the local segment (`first.m.last@subdomain.org`)
- IP-based domains (`user@[192.168.1.1]`)

Error Message: If the email is invalid, an error message is displayed, and form submission is prevented.
