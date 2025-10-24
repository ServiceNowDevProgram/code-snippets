This is a ui actions that close the child incident directly from the parent incident

Two actions for this :
1. Client side ui action from which button is shown and onClick of that button server side action will be performed
2. Server side ui action that update the state of that child incident to closed

### update
Updated client script to replace JavaScript function confirm() with GlideModal() API.
To complete a on issue #745 (Close child incident UI Action)
