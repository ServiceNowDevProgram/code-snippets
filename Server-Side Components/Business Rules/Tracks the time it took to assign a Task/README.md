This script tracks the time it took to assign a task (like an Incident, Change, etc.) by calculating the difference
between when the record was created and when it was assigned (assigned_to was set).
It checks if the assigned_to field has changed and is not empty.
If it's the first time the record is being assigned (u_assignment_time is empty), it captures the current time.
It then calculates the time difference between when the record was created and when it was assigned.
This time difference (in minutes) is stored in a custom field u_time_to_assign.
The goal is to track how long it took for the record to be assigned after creation
