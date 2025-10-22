This Background will help to bulk update the incident table where 
Finds all incidents that are:Active
Have priority 3
Have category = network
Updates each of those records:
Sets state = 2 (which usually means “In Progress”)
Adds a comment: "Updated via bulk update script"
Logs the number of records updated to the system logs.
