Table: Incident
When to run : On Before Insert

Use case: 

This Business rule prevents users from creating duplicate incidents. Its checks last 7 days open incident with same caller and short description.
When a user tries to create an incident with the same short description and caller, the system:
	Stops the new record from being created.
  Displays an info message with a clickable link to the existing incident.

This helps reduce incident clutter and ensures users track existing issues instead of repeatedly logging new ones.
