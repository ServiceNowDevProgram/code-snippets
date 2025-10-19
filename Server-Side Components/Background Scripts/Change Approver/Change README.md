Safe Approval Reassignment Script — Dummy User
Overview

This ServiceNow background script safely reassigns an approval for a given record.
Instead of directly overwriting the existing approver (which is not recommended), it:

Marks the current approval as “No Longer Required”.

Creates a new approval for a dummy user in the sys_user table.

This approach ensures safe testing, demos, or Hacktoberfest contributions without impacting real approvals or notifications.

Features

Safe & Best Practice: Avoids overwriting existing approvals that may have already triggered notifications.

Dynamic: Can be reused for any parent record by changing parentSysId.

Dummy User: Uses a placeholder user to safely test or demonstrate approval assignment.

Clear Logging: Outputs info/warning messages for easy verification.

How to Use

Create a dummy user in the sys_user table (mandatory).

Update the script with:

parentSysId → sys_id of the record whose approval you want to reassign.

dummyApproverName → Name field of the dummy user in sys_user.

Open Scripts – Background in your ServiceNow instance.

Paste the script and run.

Check the system logs for info/warnings about the reassignment.

Example Output
Existing approval marked as not required for record: d2cdb552db252200a6a2b31be0b8f5ee
New approval assigned to Dummy for record: d2cdb552db252200a6a2b31be0b8f5ee

Notes

Ensure the dummy user exists in the sys_user table; otherwise, the script will warn Dummy user not found.

This script is read-only for the old approval and only modifies workflow safely for testing.

Can be easily extended to handle multiple approvals or multiple dummy users for more complex scenarios.
