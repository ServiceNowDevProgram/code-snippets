# Overview
This snippet enables the backup of critical table data (such as task or incident records) to an external storage solution. It’s a valuable tool for developers looking to ensure redundancy and backup for sensitive data within ServiceNow.

# How It Works
- Data Extraction: Collects key record fields (such as `sys_id`, `number`, `short_description`) from `current`.
- API Call: Sends a `POST` request with record data to an external backup endpoint.
- Logging: Outputs API response for monitoring.

# Implementation
1. Update the `setEndpoint` URL to match your backup API endpoint.
2. Modify the `recordData` with table data structure as needed.
3. Ensure the Business Rule is triggered on the appropriate conditions (e.g., on record insert/update) in the target table.