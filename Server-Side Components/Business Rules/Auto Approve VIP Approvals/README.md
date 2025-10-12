## Description:
This Business Rule will auto-approve an Approval [sysapproval_approver] record when the Approver and the Requested for on a RITM are the same, and the user is a VIP User. This allows VIP users to receive the services they requested faster and avoid an unecesary approval step in the process.

## Usage Instructions/Examples:
This script is specfic for RITM's but could easily be refactored to work for other approvals on the platform (i.e. change requests).

#### When to run values:

- When: after
    - Note: This could run before, but I choose to make an update on another table (aka add a comment to the RITM about the auto-approval)
    - Note 2: If you choose to run this before, please remove the 'current.update()' from line 11 in the script
- Insert: true
- Update: false
    - Note: This could be updated to true if needed for your business process
- Filter Conditions: Source table is sc_req_item AND State changes to Requested
    - Note: The source table can be changed to other tables such as change_request

## Prerequisites/Dependencies:
1) A Catalog Item with approvals from VIP users
2) A business process that allows VIP Users to bypass their own approvals
