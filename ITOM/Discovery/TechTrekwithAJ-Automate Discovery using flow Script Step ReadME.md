This script is used in ServiceNow to automate device discovery on a network by triggering Quick Discovery using a MID Server. It is typically used within a workflow or flow, where you want to scan a device using its IP address.
It adds reliability by using two MID servers, so if one fails, the other is used as a backup.
These are the two MID Servers that will be used to perform the discovery.
You need to replace 'mid_server_1' and 'mid_server_2' with real MID Server names or sys_ids.
This gives you a backup option if the first one fails.
The script tries to get the IP address from the current record (current.ip_address).
If that’s not available, it tries to use inputs.ip_address (passed into the script).
If no IP address is found, it logs an error and stops.
This is a helper function that tells ServiceNow to start Quick Discovery for a specific IP address using a specific MID Server.
It first tries to start discovery using the first MID server.
If it works, it logs a success message and updates the record to show that discovery was triggered using MID Server 1.
If the first attempt fails, it logs a warning and tries again with the second MID server.
If the second attempt also fails, it logs an error and updates the record to reflect that both attempts failed.
The script updates the current record with the result of the discovery attempt (success or failure and which MID server was used).
