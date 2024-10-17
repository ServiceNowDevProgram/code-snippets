Overview:

This function is designed to keep Configuration Items (CIs) within the CMDB (Configuration Management Database) up-to-date by ensuring that CIs whose discovery dates exceed a certain threshold are automatically updated or deleted. It dynamically updates the operational status of CIs or removes them from the database based on the number of days since they were last discovered.

The script is flexible and can work with any CMDB table, offering administrators the ability to control and maintain data hygiene across various CMDB records by using parameters like table name, discovery source, and date thresholds.

Use Case:

In many organizations, the CMDB grows with records over time, some of which may become outdated or irrelevant. This function helps keep the CMDB clean and operational by:
1.	Marking CIs as Non-operational if they haven't been discovered in a given period (e.g., more than 14 days)
2.	Deleting (retiring) CIs if they haven't been discovered for an even longer period (e.g., more than 30 days)
This process ensures that stale or outdated records are either updated or removed, improving data quality and operational efficiency.

Key Features:

1.	Dynamic Table Input: The function accepts any CMDB table name, making it versatile for use across various CI types (applications, servers, hardware, etc.)
2.	Customizable Queries: Allows administrators to specify encoded queries to target specific records (e.g., CIs discovered by specific discovery sources)
3.	Operational Status Update: Automatically marks CIs as "Non-operational" after a defined period of inactivity
4.	CI Deletion (Retirement): Deletes CIs that have not been discovered for a prolonged period, reducing clutter in the CMDB

Benefits:
1.	Data Hygiene: Helps maintain clean, relevant, and up-to-date records in the CMDB by removing or marking inactive CIs
2.	Automation: Automates the process of identifying and managing stale records without manual intervention
3.	Flexibility: Works across multiple CMDB tables, making it adaptable to different types of CIs (servers, applications, etc.)
4.	Configurable: Parameters like the table name, discovery source, and days thresholds can be easily adjusted to meet the organization’s specific needs
5.	Improved Performance: Reducing stale records can enhance the performance of queries and operations related to CMDB data
6.	Governance & Compliance: Ensures the CMDB complies with internal policies by regularly updating or removing inactive CIs

How It Works:
1.	Table Selection: You specify the CMDB table name you want to target (e.g., cmdb_ci_appl for applications, cmdb_ci_server for servers)
2.	Query Application: The function queries the specified table using an encoded query that filters the records (e.g., CIs discovered by ServiceNow Discovery)
3.	Date Comparison: It compares the last_discovered date of each record with the current date to determine how long it has been since the CI was last discovered
4.	Operational Status Update: If the CI has not been discovered for more than a specified number of days (e.g., 14 days), the function automatically updates the CI’s operational status to Non-operational
5.	Deletion of Old CIs: If the CI has not been discovered for an extended period (e.g., 30 days), the function deletes the record, removing outdated entries from the CMDB

Parameters:
1.	Table Name: The name of the CMDB table to target (e.g., cmdb_ci_appl, cmdb_ci_server)
2.	Encoded Query: A query string used to filter the records (e.g., only CIs discovered via ServiceNow Discovery)
3.	Non-operational Days: Number of days after which the record will be marked as Non-operational
4.	Deletion Days: Number of days after which the record will be deleted (retired)

Example:
For instance, you might use this function to clean up outdated application CIs. The function will first mark all applications that haven't been discovered for 14 days as Non-operational. After 30 days without discovery, the function will then delete those records, keeping your CMDB clean and up-to-date.

Conclusion:
This dynamic function provides a simple, yet powerful solution to maintaining the integrity and cleanliness of your CMDB, ensuring that CIs are regularly checked for updates and outdated records are properly handled. By automating the process of marking CIs as Non-operational and retiring them, this function helps improve operational efficiency, data accuracy, and compliance with governance policies.

