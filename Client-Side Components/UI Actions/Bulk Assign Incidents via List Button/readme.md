## Use Case
In ServiceNow, the default Assign to Me action works only for single records.
We need a list UI Action to allow users to select multiple incidents and assign them all to themselves in one click.
## Implementation Approach
Type: List UI Action
Table: incident
Condition: Active incidents only (optional)
Action: Server-side script using GlideRecord to update selected incidents.
## Code
UI Action Configuration:
Name: Bulk Assign to Me
Table: Incident (incident)
Action Type: List
Form Button: Unchecked
List Button: Checked
Client: False (Server-side)
## Steps to Configure in ServiceNow
Navigate to System Definition → UI Actions.
Click New and fill the fields as per above.
Make List Button = True.
Paste the script into the Script section.
Add roles/conditions if required.
Save and refresh the Incident list.
## How to Use
Go to the Incident list view.
Check multiple incident records.
Click Bulk Assign to Me.
All selected incidents are now assigned to the current user.
A confirmation message shows how many incidents were updated.
## Notes / Best Practices
This is server-side to ensure security and avoid client manipulation.
Can be enhanced to assign to a specific group dynamically.
Works for any list view with sys_ids selected.
