# Auto-Close Resolved Incidents After 7 Days

Table: Incident
When: Before
Condition: State is Resolved and resolved_at older than 7 days.
This script automatically closes any Incident that has been in a "Resolved" state for 7 days.

// Use Case : 
Keeps your Incident queue clean and ensures SLA metrics stay accurate.

// How :
Queries incident table.
Finds records with state = Resolved and resolved_at older than 7 days.
Changes state to Closed.
