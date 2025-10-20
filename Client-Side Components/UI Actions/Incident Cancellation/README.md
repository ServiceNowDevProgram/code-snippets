## Simplified Incident Cancellation UI Action

## Overview
This enhancement improves the Incident Cancellation UI Action in ServiceNow by replacing an unnecessarily complex GlideModal confirmation structure with a leaner, more maintainable confirmation() dialog.
The new approach enhances code readability, reduces script overhead, and aligns with ServiceNow client–server scripting best practices.

## Problem Statement
The previous incident cancellation UI Action used a GlideModal confirmation window, which:
- Increased code complexity with extra modal creation and rendering steps
- Complicated maintainability with mixed client-server logic
- Provided no additional usability benefit over native browser confirmation


## Proposed Enhancement
The enhancement simplifies the flow by using JavaScript’s built-in confirm() method for quick user confirmation and Added a work note for traceability: “Cancelled this incident.”

## Updated Logic:
- Client-side:
Confirm with confirm() dialog before proceeding.
If confirmed, submit action via gsftSubmit() API to call the server script.

- Server-side:
Update the incident state to "Cancelled" (state = 8).
Add a work note for traceability: “Cancelled this incident.”
Redirect the user back to the current record after completion.

# Benefits
- Simpler and cleaner codebase
- Avoids unnecessary modal logic.
- Better maintainability
- Easier for future developers to modify or extend.
- Improved traceability
- Includes meaningful work notes for auditing.
- Aligned with ServiceNow best practices
- Maintains proper separation of client and server logic following official guidelines.​

## How to Use

- Navigate to System UI → UI Actions in ServiceNow.
- Create a new UI Action on the Incident table.
### Set:
- Action name: Cancel Incident
- Client: Checked
- Onclick: cancelIncident();
- Condition: current.state != 8 && (current.state == '1' || current.state == '2' || current.state == '3');
- Add the provided client and server scripts from the script.js file
- Test the action on an incident form.

## Issue Reference
This contribution is based on the issue titled: `Issue with UI Action Implementation for Simplified Incident Cancellation`
## Issue no: [#2299](https://github.com/ServiceNowDevProgram/code-snippets/issues/2299)
— proposed to improve readability, maintainability, and UX by using a confirmation dialog instead of a GlideModal construct.
