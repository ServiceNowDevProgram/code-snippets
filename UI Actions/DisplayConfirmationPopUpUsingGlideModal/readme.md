
1. Overview
This script manages user actions by showing alerts and confirmations during form interactions in ServiceNow. It ensures that only the assigned user can close a task and provides a confirmation prompt before closing the task. This improves user accountability and prevents accidental changes.

2. How to Use
Pre-requisites: This script can be placed in the Client Script section of a form or linked to a UI Action in ServiceNow. It assumes that the form has an assigned_to field and a state field that can be set to closed_complete.

Steps to Use:

Assign this function to a button or UI action that users will click to close a task.
The script first checks if the user is the one assigned to the task.
If they are not, an alert is displayed, and the function halts.
If they are the assigned user, a confirmation prompt appears asking if they are sure about the action.
If the user confirms, the task state is set to closed_complete, and the form is saved.
3. Benefits
User Validation: Ensures that only the assigned user can complete certain actions, such as closing the task.
Confirmation Prompt: Prevents accidental closures by providing an additional step (confirmation).
Clear Alerts: Informs users with real-time feedback if they are not authorized to perform certain actions.
4. Procedure to Execute
Add this script into a Client Script or as part of a UI Action in the desired ServiceNow form.
Make sure the action button is visible and clickable only when necessary conditions are met.
Test the script by assigning a task to yourself and attempting to close it using the button. Then log in as another user and test the alert functionality.
5. Testing the Script
Positive Test Case:

Log in as the user assigned to the task.
Click the action button.
Confirm the action in the modal.
Ensure that the task state is changed to 'closed_complete' and the form is saved successfully.
Negative Test Case:

Log in as a user who is not assigned to the task.
Click the action button.
Ensure that an alert appears, and the task is not closed.
6. How It Works
Validation: The script first checks if the logged-in user is the one assigned to the task using g_user.userID and g_form.getValue('assigned_to').
Alerts: If the user is not authorized, it displays an alert using g_modal.alert.
Confirmation: If the user is authorized, the script triggers a confirmation dialog using g_modal.confirm. Based on user confirmation, it then proceeds to close the task by setting the state and saving the form.
This script helps ensure that actions are deliberate and performed only by the right user.
