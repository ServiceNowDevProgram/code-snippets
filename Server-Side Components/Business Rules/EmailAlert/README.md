**Overview**
This implementation demonstrates how to display the Caller’s email address in an alert whenever an Incident form is loaded in ServiceNow.
It uses a Business Rule to fetch the email and a Client Script to display it on the form.

Components:
Business Rule: Fetches the Caller’s email and stores it in a temporary variable (g_scratchpad) to be used on the client side.
Client Script (onLoad): Reads the email from g_scratchpad and displays it in an alert when the form is loaded.

Usage:
Apply the Business Rule to the Incident tabl and add the Client Script (onLoad) to the same table.
When an existing Incident record is opened, the Caller’s email will appear in a pop-up alert.

Result
Existing Incident records show an alert with the Caller’s email address.
New records do not trigger the alert.
