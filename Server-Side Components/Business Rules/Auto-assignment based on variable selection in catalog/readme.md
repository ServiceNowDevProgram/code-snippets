📘 README — Auto Assignment by Application Group Variable
ServiceNow Business Rule — sc_req_item
✅ Purpose

This Business Rule automatically sets the Assignment Group on a Requested Item (RITM) based on the user’s selection in a catalog variable. It also updates the mapped variable value in the sc_item_option_mtom table to ensure data consistency across catalog records.

🔧 Where This Script Runs
Item	Details
Table	sc_req_item
When	Before Insert / Before Update
Script Type	Business Rule
Execution Scope	Server-side
📌 Prerequisites

For this script to operate correctly:

1️⃣ Catalog Variable exists on the item:

Name → dummy_app_group

Type → Select Box

Possible Values → AppGroup A, AppGroup B, AppGroup C, etc.

2️⃣ Assignment Group sys_ids should be updated to real sys_ids in Production.

3️⃣ The variable that stores reference to the group must be mapped in M2M table:

Name → dummy_group_variable

Type → Reference (sys_user_group)

4️⃣ Assignment Group field must be visible and editable on RITM.

🚀 What the Script Does

✔ Reads catalog variable value selected by requester
✔ Matches the value and determines corresponding Assignment Group
✔ Updates RITM field assignment_group
✔ Updates dummy_group_variable in sc_item_option_mtom table
✔ Displays info/error messages for debugging and validation

🧩 Example Mapping Used in This Script
Catalog Variable Value	Assignment Group (Dummy sys_id)
AppGroup A	11111111111111111111111111111111
AppGroup B	22222222222222222222222222222222
AppGroup C	33333333333333333333333333333333

Replace with actual assignment group sys_ids before deployment.

✅ Benefits
Feature	Advantage
Automated Group Assignment	Eliminates manual errors & delays
Consistency in Catalog Variables	Accurate reporting and auditing
Debug-Friendly Messaging	Quick validation during testing
🛠️ Deployment Notes

Disable info messages (gs.addInfoMessage) after successful testing

Maintain updates when catalog variable choices expand

Avoid hard-coding by considering future enhancement → mapping object / system properties
