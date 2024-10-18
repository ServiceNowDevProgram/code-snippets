Overview
This document explains how to implement a custom UI action that triggers a UI page from the list view of a table in ServiceNow. Specifically, it demonstrates how to open a modal dialog when multiple items are selected in the list view. The modal dialog will display a UI page and pass the selected record sys_ids as parameters. This allows users to update multiple records simultaneously through the UI page, streamlining processes such as mass updates. This approach enhances user efficiency by enabling the execution of actions on multiple records at once, reducing manual effort and improving workflow automation
Purpose of the UI Action
The purpose of this UI action is to allow users to select multiple records from the list view and trigger a modal popup that displays a custom UI page. The user can interact with the popup to perform actions to update field value by slecting field values from the pop up. The selected records are passed to the UI page as parameters, ensuring the action is applied to all the checked items.

Document: Using UI Action to Call a Custom UI Page in List View
Overview
This document explains how to implement a custom UI action that calls a UI page from the list view of a table in ServiceNow. Specifically, it demonstrates how to open a modal dialog when multiple items are selected in the list view. The modal dialog will display a UI page and pass selected record sys_ids as parameters. This can be useful for tasks like requesting an exception, remediation, or other custom actions that require user interaction.

Purpose of the UI Action
The purpose of this UI action is to allow users to select multiple records from the list view and trigger a modal popup that displays a custom UI page. The user can interact with the popup to perform actions such as remediation, request handling, or exception requests, depending on the implementation of the UI page. The selected records are passed to the UI page as parameters, ensuring the action is applied to the correct items.

How It Works
UI Action Creation:
A UI action is created in ServiceNow, configured to be available in the list view of a specific table. In this example, the UI action is configured on the Incident table.

JavaScript Function:
The function showExceptiondialog() is triggered when the UI action button is clicked. This function does the following:

Check for selected records:
The script checks if any records have been selected in the list view. If no records are selected, an error message is shown to the user.
Open Modal Popup:
If records are selected, the function opens a modal dialog using either GlideModal or GlideDialogWindow, depending on the environment. The dialog displays a UI page specified by name (incident_pop_up in the example).
Pass Selected Records:
The selected record sys_ids are passed as a parameter (sysparm_sys_id) to the UI page, allowing the page to perform actions on those records.
UI Action Configuration
Table:
The UI action is configured for a specific table, such as the Incident table (incident).

List Context:
The UI action should be available in the list view, where multiple records can be selected.

OnClick Event:
The UI action calls the JavaScript function showExceptiondialog() when clicked.
 Testing
Navigate to List View:
Go to the list view of the table where the UI action is configured (e.g., Incident table).

Select Records:
Check one or more records in the list view.

Click the UI Action Button:
Click the UI action button that triggers the showExceptiondialog() function. If no records are selected, an error message will appear. If records are selected, the modal dialog will open and display the custom UI page.

Verify Modal:
Ensure that the modal popup displays the correct UI page and that the selected records’ sys_ids are passed as parameters.
Benefits
User-Friendly:
The modal popup provides an intuitive interface for users to perform actions on multiple selected records without leaving the list view.

Customizable:
The UI page can be customized to handle a variety of actions based on the selected records. For example, it can be used for remediation tasks, exception requests, approvals, or other workflows.

Efficiency:
Users can quickly perform actions on multiple records at once, reducing the need for repetitive manual operations.

Error Handling:
The script includes error handling to ensure users are prompted if they attempt to perform an action without selecting records.
