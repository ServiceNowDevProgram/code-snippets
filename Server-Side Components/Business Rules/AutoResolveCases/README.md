# Auto-Close Resolved Incidents After 7 Days

This Business rule automatically closes any Incident that has been in a "Resolved" state for 7 days.

### How
Queries incident table.
Finds records with state = Resolved and resolved_at older than 7 days.
Changes state to Closed.
