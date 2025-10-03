Send Email via API:

This is a ServiceNow script that uses the sn_ws.RESTMessageV2 API to send an email via a REST endpoint. It is configured to send an email for the "Hacktoberfest 2025" event, addressing two specific users and linking the email to an incident record in ServiceNow.

Prerequisites:

A ServiceNow instance with a REST API endpoint for sending emails (/api/now/v1/email).
A valid user and password for basic authentication.
The script should be executed within a ServiceNow context (e.g., in a Business Rule, Script Include, or background script).

Installation and Usage:

Navigate to your script location (e.g., a Business Rule or background script).
Copy and paste the entire script into the script field.
Modify the variables to match your instance and requirements:
Endpoint URL: Replace instance_name.service-now.com with your actual instance name.
Credentials: Provide a valid username and password for the setBasicAuth method.
Recipient and Subject: Update the to array and subject in the body variable as needed.
Table and Record ID: Ensure the table_name and table_record_id correspond to an existing record in your instance.
