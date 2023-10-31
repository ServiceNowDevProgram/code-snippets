# ServiceNow Incident Creation Background Script

## Description

This script allows you to create a new incident in the ServiceNow "incident" table via a background script.

## Prerequisites

Before using this script, make sure to:

- **ServiceNow Access**: Ensure you have access to a ServiceNow instance where you can run background scripts.
- **Sys ID**: Obtain the Sys ID of the user who will be set as the caller for the new incident.

## Usage

1. In your ServiceNow instance, navigate to the "Script - Background" module.
2. Create a new background script.
3. Copy and paste the provided code snippet into the script.
4. Customize the script by setting the short description, description, caller (replace 'user_id' with the actual user's Sys ID), and priority.
5. Execute the script to create a new incident in the "incident" table.

- Tammar Haider
- thaiderrizvi2gmail.com
