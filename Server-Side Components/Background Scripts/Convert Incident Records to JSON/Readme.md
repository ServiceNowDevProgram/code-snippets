Convert Active Incidents to JSON – ServiceNow
Overview

This script fetches all active Incident records from your ServiceNow instance and converts them into a JSON format. The JSON output is easy to read and can be used for reporting, integration, or debugging purposes.

By converting records to JSON, you can quickly share structured data with external systems, automate processes, or use it in scripts and dashboards.

Features

Retrieves all active incidents from the incident table.

Dynamically extracts selected fields (configurable).

Automatically resolves reference fields to display values.

Adds human-readable state labels (e.g., "New", "In Progress", "Resolved").

Outputs pretty-printed JSON for easy readability.

Configuration

Table Name: Set the tableName variable to the table you want to extract records from.

Fields to Include: Update the fieldsToInclude array to include the fields you need in the JSON. For example:
