🛠️ Smart Incident Assignment – Auto-Assign Incident to Idle Members

📘 Overview

This Business Rule automatically assigns incidents to a predefined support group when specific keywords, such as “disaster” or “emergency”, are present in the incident’s short description. It also ensures that incidents are distributed among group members who are currently idle, maintaining workload balance across the team.

🧩 Problem Statement

During critical situations, incidents tagged as disaster or emergency need immediate attention.
Manually assigning these incidents can lead to:

Delays in response

Uneven workload distribution among support team members

Errors in group assignment

💡 Solution

The Auto-Assign Support Group Business Rule solves this by:

Checking if the incident’s short description contains “disaster” or “emergency”.

Automatically populating the Assignment Group field with Support Group.

Scanning all active members of the group and checking if they already have open incidents.

Assigning the incident to the first idle member to ensure balanced workload.

Providing an info message if all members are currently busy, allowing fallback handling.

🚀 Benefits

✅ Ensures critical incidents are promptly assigned to the correct support team.

✅ Maintains balanced workload across team members, avoiding overloading a single user.

✅ Eliminates manual assignment errors, saving time and improving response efficiency.

✅ Enhances operational visibility and accountability in high-priority scenarios.

🛠️ Implementation

Table: Incident [incident]

Business Rule Type: Before Insert / Before Update

Trigger: When short description contains disaster or emergency
