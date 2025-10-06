# ServiceNow Incident Creation Script

## 📌 Overview
This script demonstrates how to create an incident record in ServiceNow using the GlideRecord API. It is intended for use in server-side scripting environments such as Script Includes, Business Rules, or background scripts.

## ✅ Prerequisites
- Access to a ServiceNow instance with appropriate permissions.
- Familiarity with JavaScript and ServiceNow scripting.
- The `incident` table must be accessible and modifiable.
- Script should be executed in a server-side context.

## 🛠️ Script Usage


var incident = new GlideRecord('incident');
incident.initialize();
incident.short_description = 'Sample Incident Created via Script';
incident.description = 'This incident was created using a GlideRecord script.';
incident.caller_id = gs.getUserID(); // Sets the current user as the caller
incident.priority = 3; // Medium priority
incident.category = 'inquiry'; // Example category
incident.insert();
