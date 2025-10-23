Defines a list of IP addresses to check (hardcoded in the script).
Example IPs: 192.168.1.35, 192.168.1.27, 192.168.1.15.
For each IP address in the list:
It looks up the CI (Configuration Item) in the cmdb_ci_computer table with a matching IP.
If a CI is found:
It checks the discovery_device_history table to see if that CI was discovered by ServiceNow Discovery.
If discovery history exists, it finds the related Discovery Status record (discovery_status table) and gets its number (like DIS123456).
If no CI or discovery record is found, it notes the reason in the result.
Compiles all results (IP + discovery status or error message) into a list.
Prints the results in a clear JSON format in the system logs, making it easy to read and review.
