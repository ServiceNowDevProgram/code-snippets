📘 README — Incident State Validation (Client Script)
Overview

This Client Script enforces the correct ITIL incident lifecycle by preventing users from directly closing an incident without first transitioning it through the Resolved state.
If a user attempts to move the state directly to Closed Complete, the system reverts the change and displays a notification.

What This Code Does
Monitors changes to the state field on Incident form
Checks if new selection is trying to skip the Resolved step
Reverts state to its previous value when the rule is violated
Alerts the user with a clear and guided message
Refreshes the form to maintain data consistency
Usage Instructions

Create a Client Script on the Incident table
Type: onChange
Field Name: state
Paste the script under the script section
Test by trying to directly move an Incident to Closed Complete
S
cript Requirements
State values must be configured as:
6 → Resolved
7 → Closed Complete

Script runs only on Incident records
Must be active in applicable ITIL views
Notes for Developers
This code supports clean transition handling for ITSM workflows
Helps enforce process compliance without server-side overhead
Recommended for environments requiring strict closure governance
