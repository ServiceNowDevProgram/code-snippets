ServiceNow User Creation Script:
Overview:

This script allows you to create a new user in the sys_user table of your ServiceNow instance. It performs checks to ensure mandatory fields are present and avoids creating duplicate users based on the user_name.

It is designed to be directly run in Background Scripts and is easy to adapt for creating multiple users or adding additional fields.

Features:

Dynamically sets field values from a JavaScript object.

Checks that all mandatory fields (user_name, first_name, last_name, email) are provided.

Avoids duplicates by checking if the user_name already exists.

Provides clear logs in the system for success or failure.

Fully compatible with Background Scripts.
