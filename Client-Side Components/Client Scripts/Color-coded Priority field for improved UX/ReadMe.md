Dynamic Background Color for Choice Fields in ServiceNow
Overview

This script changes the background color of a choice field dynamically based on the selected backend value.
For example, in the Incident form, when the Priority changes, the field’s background color updates to visually show urgency.

How to Use

Go to System Definition → Client Scripts → New

Enter the following details:

Name: Dynamic Background Color for Choice Field

Table: Incident

Type: onChange

Field name: priority 

UI Type: All

Save and test by changing the Priority value.

Key Points

Works for any choice field 

Uses backend values (1, 2, 3, etc.) for color mapping.

Adds a smooth transition for better visual feedback.

Automatically resets color when default or invalid value is selected.

Example Color Map
Backend Value	Meaning	Color
1	Critical	Red
2	High	    Orange
3	Moderate	Yellow
4	Low	      Blue
5	Planning	Green
