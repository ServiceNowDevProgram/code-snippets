/Auto-Reassign Stale Incidents to Group Manager

//Use Case:
Automatically reassigns incidents that haven’t been updated for 15+ days to their Assignment group manager.

//Logic :
 Runs daily at midnight (12AM CST)
 Finds all incidents with:
 State = In Progress
 No updates for 15 or more days.
 Reassigns to the 'manager' of the assignment group.
 Adds a system work note.
