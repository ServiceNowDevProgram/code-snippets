Dynamic Field Label Change in ServiceNow
Overview

This script is created for the Incident table to change the Description field label when the Priority field value changes.

When the Priority is set to 1 (Critical), the Description label becomes
“Describe the critical issue in detail” to help users give more clear information.
For all other priorities, it goes back to “Description.”

Setup Steps:

Go to System Definition → Client Scripts → New

Fill in the following details:

Name: Change Description Label Based on Priority

Table: Incident

UI Type: All

Type: onChange

Field name: Priority

Notes

Works only on the Incident form when the Priority field is changed.

The label updates immediately without reloading the form.

You can change the label text to fit your own use case.
