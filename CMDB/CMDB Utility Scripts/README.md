The CMDVB Utility Scripts:
1. unused CIs: This script is used to identify unused Configuration Items (CIs) in the CMDB that have not been updated within a specified number of days. The primary goal is to flag CIs that may be outdated or not maintained. In the script one can provide for the number of days to check for the 
CIs that haven't been be used for 'd' days.

2. detectDuplicates.js: This script is designed to detect duplicate Configuration Items (CIs) in the CMDB (Configuration Management Database) in ServiceNow. Duplicate CIs can cause data quality issues and interfere with processes such as asset management, incident management, and change management. By identifying CIs with the same values in specific fields (like name, serial number, or asset tag), the script helps maintain the integrity of the CMDB.

3. populateMissingManufacturers.js: This script is used in ServiceNow to automatically populate the manufacturer field for CIs (Configuration Items) in the CMDB (Configuration Management Database) when the manufacturer field is missing (null). It uses a predefined mapping between models and their respective manufacturers, and updates the CIs accordingly.
