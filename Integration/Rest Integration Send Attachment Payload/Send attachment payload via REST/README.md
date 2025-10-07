Overview

This integration script is designed to send both a data payload and any attachments related to a record from ServiceNow to an external system via REST API. It uses ServiceNow’s RESTMessageV2 API to construct the message and send the data, making it adaptable for various external integrations.

Prerequisites

1.	ServiceNow Instance: Ensure you have access to a ServiceNow instance with the necessary permissions to create and run REST integrations.
2.	REST Message Setup: Configure a REST message in ServiceNow by navigating to System Web Services > Outbound > REST Message. This setup will define the target external system, API endpoint, and the HTTP method (e.g., POST, GET).

Steps

1. Create a REST Message in ServiceNow

•	Go to System Web Services > Outbound > REST Message.
•	Create a new REST Message with a descriptive name.
•	Define the endpoint URL (where the external API is hosted) and the HTTP method (e.g., POST, PUT).
•	Save the REST Message.

2. Set Up the Script

•	Copy and paste the provided script into the appropriate area in ServiceNow (e.g., a Business Rule, Script Include, or Scheduled Job).
•	Replace the placeholder values for the REST message name and method with the actual name and method defined in Step 1.
Example:
o	REST Message Name: The name of the REST message you just created (e.g., My_Rest_Integration).
o	Method: The HTTP method for the REST call (e.g., POST).

3. Modify Payload Data

•	The script constructs a dynamic payload by retrieving key fields such as sys_id, number, table_name, and other fields from the current record.
•	If you need to include additional fields in the payload (e.g., custom fields), you can add them to the payload generation logic in the script.
Example fields:
o	current.short_description
o	current.priority
Adjust these fields based on what data you need to send to the external system.

4. Attachment Handling

•	The script queries the sys_attachment table to retrieve any attachments related to the current record.
•	For each attachment, it fetches details such as:
o	content_type (e.g., PDF, JPEG)
o	file_name (the name of the file)
o	size_bytes (file size)
o	sys_id (unique identifier for the attachment)
•	These details are included in the JSON payload that is sent to the external system.

5. Sending the REST Message

•	The script sends the constructed payload along with any attachment details to the external system by executing the REST message.
•	It uses sm.execute() to trigger the REST API call, where sm is the RESTMessageV2 object.

6. Debugging and Logging

•	To assist with debugging, a debug flag is included in the script. When set to true, the script will log:
o	The payload being sent.
o	The response from the external system.
o	The status code of the REST call (e.g., 200 for success, 500 for error).
•	Enable or disable logging based on your needs by toggling the debug variable.

7. Error Handling

•	If the REST call fails for any reason, the script captures the error message and assigns a status code of 500 (indicating an internal error).
•	The error message can be logged or handled further as needed.
________________________________________
Usage
1.	Trigger: Attach this script to a Business Rule, Script Include, or any other automated process that triggers when a record is created or updated. For example, you might want the REST integration to run when a new incident is acknowledged.

2.	Execution: When triggered, the script will:

o	Query for any attachments related to the current record.
o	Construct a payload with relevant data and the attachments.
o	Send this payload to the configured REST API endpoint.

3.	Customization: You can easily customize the fields included in the payload or adjust the way attachments are handled by modifying the script.
________________________________________
Customization Options
1.	REST Message: Change the REST message name and method to match the specific external system you are integrating with.

2.	Payload Fields: Modify the fields included in the payload by adding or removing fields from the current record.

3.	Attachment Filtering: If you want to filter or exclude certain types of attachments, you can modify the query on the sys_attachment table.
________________________________________
Troubleshooting
•	Missing Attachments: If attachments are not being sent, ensure that the sys_attachment query is correctly filtering by the sys_id and table_name of the current record.

•	Error Status Codes: If you receive a 500 error status, check the external API endpoint and any firewall or network restrictions between ServiceNow and the external system.

•	Debug Mode: Enable debug mode to log the request body and response, which can help you diagnose any issues with the payload or API response.

