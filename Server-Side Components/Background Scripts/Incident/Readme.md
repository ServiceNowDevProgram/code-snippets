# Create Priority 1 Incident in ServiceNow

This script is designed to create a **Priority 1 incident** in ServiceNow using the GlideRecord API. It can be used in a Script Include, Business Rule, or Background Script to automate the creation of critical incidents.

## 📝 Script Purpose

The script programmatically creates a new incident record with high urgency and impact, ensuring it is classified as Priority 1. It sets essential fields such as short description, category, and caller information.

## ✅ Key Features

- Initializes a new incident record.
- Sets the following fields:
  - `short_description`: Brief summary of the incident.
  - `description`: Detailed explanation of the issue.
  - `priority`: Set to `1` (Critical).
  - `impact`: Set to `1` (High).
  - `urgency`: Set to `1` (High).
  - `caller_id`: Automatically assigned to the current user.
  - `category`: Example category set to `'network'`.
- Inserts the incident record into the database.
- Logs the newly created incident's sys_id.

## 🚀 Usage

This script can be placed in:
- A **Script Include** to be called programmatically.
- A **Business Rule** to trigger incident creation based on conditions.
- A **Background Script** for manual execution.

## 📌 Example


var incidentGR = new GlideRecord('incident');
incidentGR.initialize();
incidentGR.short_description = 'Critical Incident - Immediate Attention Required';
incidentGR.description = 'This is a Priority 1 incident created via script.';
incidentGR.priority = 1;
incidentGR.impact = 1;
incidentGR.urgency = 1;
incidentGR.caller_id = gs.getUserID();
incidentGR.category = 'network';
var newIncidentID = incidentGR.insert();
gs.info('New Incident created with ID: ' + newIncidentID);
