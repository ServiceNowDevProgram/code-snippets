This code snippet automates the discovery of devices in ServiceNow using MID (Management, Instrumentation, and Discovery) servers by triggering Quick Discovery through a workflow. The code can also be modified for different workflows/ flows as needed.

Key features include:

MID Server Setup: It defines two MID servers to ensure redundancy, which improves the chances of successfully finding devices.

IP Address Retrieval: The code retrieves the IP address to be scanned from the current workflow context.

Discovery Process:

It creates a Discovery object to initiate the process. The script first attempts to find the device using the first MID server. If that fails, it logs a message and tries again with the second MID server. Logging and Status Update: After the discovery attempts, the script logs the results and updates the current context with the discovery status.

This code enhances device discovery in ServiceNow, making the process more reliable by utilizing multiple MID servers.
