# The provided script updates incident records meeting specific criteria. The script consists of two functions:

1. updateWorkNotes(): This function updates work notes for incidents with a priority of 1, state 2, and a category of "software." It sets the "work_notes" field to 'Auto Update' for each matching incident.

2. updateResolve(): Similar to updateWorkNotes, this function targets incidents with the same criteria. It updates the state to 6 (typically indicating "Resolved"), sets the close code to 'duplicate,' close notes to 'Auto update,' and disables associated workflows.

Both functions use GlideRecord to query and update records in the "incident" table.
