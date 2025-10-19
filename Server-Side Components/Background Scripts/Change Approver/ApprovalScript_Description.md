Change Approver for Any Record — ServiceNow Background Script
Overview

This ServiceNow background script allows you to update the approver for any record that has an approval triggered.
It’s useful for quickly correcting approvals during testing, troubleshooting workflows, or reassigning approvals in your instance.

How It Works

The script queries the sysapproval_approver table for a specific parent record (like a Change Request, Catalog Request, etc.).

Once the approval record is found, it updates the approver field with the new user you specify.

If no matching approval record exists, the script logs a warning.

How to Use

Open Scripts - Background in your ServiceNow instance.

Copy and paste the script.

Replace the placeholders:

'd2cdb552db252200a6a2b31be0b8f5ee' → the sys_id of the parent record for which approval is triggered.

'Beth Anglin' → the display name of the new approver.

Run the script.

Check the system logs to confirm the approver has been updated.

Example Output
Approver successfully updated to Beth Anglin for record: d2cdb552db252200a6a2b31be0b8f5ee


or if no record is found:

No approval record found for sys_id: d2cdb552db252200a6a2b31be0b8f5ee

Notes

Make sure you are using the sys_id of the parent record, not the sys_id of the approval record itself.

This script is safe for testing and minor corrections, but always verify in a non-production environment before running in production.

You can reuse this script for different records simply by updating the sys_id and approver name.

If you want to assign a new approver name, ensure the user exists in the sys_user table. Only users present in the system will display correctly in the approver field; otherwise, the field will appear (empty).
