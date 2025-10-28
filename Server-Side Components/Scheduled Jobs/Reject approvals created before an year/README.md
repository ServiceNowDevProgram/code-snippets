**Script Purpose:**
This script helps you manage approval records in ServiceNow. It searches for approval requests in the sysapproval_approver table that were created more than 12 months ago and are currently marked as "requested." The script then updates these records to change their status to "rejected."

**How to Use This Script**
Where to Run It: You can execute this script in a server-side context, such as a Scheduled Jobs, Script Include, or Background Script. Make sure you have the necessary permissions to access and update records in the sysapproval_approver table.

**Be Cautious:** The script will automatically find the relevant approval records and update all matching records, so double-check the criteria before executing it.
