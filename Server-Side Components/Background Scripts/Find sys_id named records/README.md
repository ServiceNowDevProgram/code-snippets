## Find sys_id named records

Use this background script to find records that contain a sys_id value in a specified field (other than the actual sys_id field)

This might for example have happened by accident during migration of data between two ServiceNow instances where referenced records on the target instance were accidentally created due to a Choice action=create setting on a Field Map.

How to use:

Change the "table" and "field" variables to the table and field name you want to search for sys_ids in
