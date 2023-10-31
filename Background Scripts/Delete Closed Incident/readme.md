# ServiceNow Incident Deletion Script

## Description

This script is used to delete incidents in the ServiceNow "incident" table with the state set to "closed."

## Prerequisites

Before using this script, make sure to:

- **Backup Data**: Ensure you have a backup of the incident data or that you are working in a non-production environment, as deleted records cannot be easily recovered.

## Usage

1. In your ServiceNow instance, navigate to the "Script - Background" module.
2. Create a new background script.
3. Copy and paste the provided code snippet into the script.
4. Execute the script to delete incidents in the "Closed" state.

Please verify that '7' represents the "Closed" state in your specific instance by checking the state values.

## License

This script is provided under the servicenow

## Contact Information

- Tammar Haider
- thaiderrizvi@gmail.com
