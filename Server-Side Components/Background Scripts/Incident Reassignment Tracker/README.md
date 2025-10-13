Incident Reassignment Tracker
Use Case - 
In IT service management, incidents are sometimes reassigned multiple times before reaching the right technician.  
This script helps identify incidents that have been **reassigned more than 5 times**, so managers can review the assignment process and reduce ticket bouncing.

How It Works -
1. Loops through all **active incidents**.
2. Counts how many times the **`assigned_to`** field changed using the `sys_audit` table.
3. Prints the incident numbers in the system logs if they exceed the threshold (5 reassignments by default).
