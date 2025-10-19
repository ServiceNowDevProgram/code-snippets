Set Incident Priority to Critical — UI Action

This ServiceNow UI Action allows you to quickly mark an incident as Critical directly from the form. It’s designed to make urgent incidents stand out and ensures that key fields are updated in a consistent way.

Purpose / Use Case:

Sometimes incidents require immediate attention. Instead of manually updating multiple fields, this button helps you:

Mark the incident as Critical.

Assign it to yourself (the logged-in user).

Add a note in the description indicating that it was marked Critical and by whom.

Provide a visual message confirming the change.

This makes it easier for teams to prioritize urgent incidents and track who made the update.

How It Works:

Appears as a button on the incident form.

Clicking it will first check if the incident is already Critical.

Prompts a confirmation message before applying changes.

Updates relevant fields and appends a note to the description.

Displays an informational message so the user knows the incident has been updated.

Note: Changes happen on the form only. The incident record in the database is updated only after you save or update the form.

Installation / Setup:

Navigate to System Definition → UI Actions in ServiceNow.

Click New to create a UI Action.

Configure the following:

Name: Set Priority to Critical

Table: Incident

Form Button: Checked

Client: Checked

List: Unchecked

Paste the script into the Onclick field.

Save and test on an incident form.

Usage:

Open an incident form.

Click the “Set Priority to Critical” button.

Confirm the action when prompted.

Review the description note and save the record to update the database.
