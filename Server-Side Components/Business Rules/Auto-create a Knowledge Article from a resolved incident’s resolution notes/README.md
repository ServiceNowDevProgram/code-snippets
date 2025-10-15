This ServiceNow Business Rule automatically creates a Knowledge Article when an Incident is resolved and includes detailed resolution notes.  
It helps promote knowledge sharing, reduce repeated issues, and improve ITSM efficiency.

Trigger when an Incident moves to Resolved.
Check if a Knowledge Article with a similar short description already exists.
If no similar KB exists → create one in “Draft” state.
If one exists → skip creation.
