Script: Copy the Assignment group and Assign the details of sc_task to the Request table.

This script automates the process of assigning values from the first sc_task in a REQ to the parent REQ record. This is useful for keeping the request record in sync with its initial task(If multiple tasks are created for one request), allowing other workflows to use these values directly from the request.

Purpose of the Script:

End User Notification on Request Closure: When closing a service request, this script ensures that the Assignment Group and Assigned To details are copied to the REQ record, providing clarity for end users in the request closed notification. This is especially helpful to users who need to know who worked on their request.

Tracking in Survey Table: By maintaining the Assignment Group and Assigned To details on the REQ record, these details can be linked to surveys. This helps capture accurate data on the responsible group or individual when processing surveys and feedback, particularly if the survey process involves rewriting or transferring details.
