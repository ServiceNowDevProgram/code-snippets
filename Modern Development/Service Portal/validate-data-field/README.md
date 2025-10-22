# Validating a data field in a Service Portal

Use Case: When submitting a Record Producer, a date field can’t be in the past. How to accomplish this?

We can create a Catalog Client Script.

1) What is the trigger?

The script will run when the date field value changed.

2) What do we need to confirm?

We need to check if the date provided is in the future.

3) What if the date is not in the future?

If the date is not in the future, then we show an error message to inform that the date cannot be in the past.

Step by step process

1) Create a Record Producer (RP) and define the Catalog and Category so it will be visible in a Service Portal

2) Create a variable in your RP. In this example, the variable will have this configuration:

Type: Date
Question: Project Deadline
Name: project_deadline
Mandatory: Yes (checked)

3) Create a Catalog Client Script in your RP to check if the project_deadline value changed. If the date is in the past, show an error message to the user.

Your Catalog Client Script will look like this:

Name: Validate Project Deadline
Applies to: A Catalog Item
UI Type: Mobile / Service Portal
Type: onChange
Variable name: project_deadline