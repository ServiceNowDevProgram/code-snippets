Use Case: 

Everytime user try to resolve the incident, the resolution codes and resolution notes are mandatory to be entered as it hidden in tabs,Since it is mandatory fields. So to ease the process we introduced a custom UI action will prompt the user
to enter resolution notes and resolution codes and automatically set the state to Resolved.

How it Works:

Navigate the Incident form and make sure the incident is not closed or active is false.
Click Resolve Incident UI action, it will open an modal with asking resolution notes and resolution code.
Provide the details and submit. incident is updated with above Resolution notes and codes and set state to be Resolved.


Below Action Need to Performed: 

1.Create UI action: 

Navigate to System UI > UI Actions.
Create a new UI Action with the following details:
Name: Resolve Incident (or a descriptive name of your choice).
Table: Incident [incident].
Action name: resolve_incident_action (must be a unique, server-safe name).
Order: A number that determines the position of the button on the form.
Client: Check this box. This is crucial for running client-side JavaScript.
Form button: Check this box to display it on the form.
Onclick: ResolveIncident() (This must match the function name).
Condition: Set a condition to control when the button is visible (e.g., current.active == true).

2.Create Script Include: 

Navigate to System Definition > Script Includes.
Click New.
Fill in the form:
Name: ResolutionProcessor
Client callable: Check the box.
Copy the provided script into the Script field.
Click Submit.

3.Create UI page:

Navigate to System Definition > UI pages
Fill the HTML and client script.
Click Submit.


