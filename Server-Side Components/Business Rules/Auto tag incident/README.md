📘 Overview

This feature automatically scans newly created or updated Incidents for specific keywords (like Email, VPN, Server) and attaches structured Labels automatically wheneven any incident gets created.
It leverages ServiceNow’s native label and label_entry tables to organize incidents into searchable categories — improving visibility, reporting, and problem trend analysis.

🎯 Problem Statement

Manual tagging of incidents is inconsistent and time-consuming. As a result, identifying recurring issues or related incidents becomes difficult.
The Incident Auto-Tagging solution automates this process, ensuring every incident containing common keywords is automatically labeled and linked for faster triage and analytics.

💡 Solution Approach

A Business Rule runs on the Incident table (Before Insert) to:

Detect defined keywords from Short Description and Description.

Create or reuse a Label (label table) for each keyword.

Create a Label Entry (label_entry table) linking the Label to the Incident with details such as title, URL, table, etc.

Prevent duplicates by verifying existing entries before insertion.

🧩 Benefits

🕒 Time saving: Minimizes time as no manual tagging is needed

🔍 Quick Search: Filter incidents by keyword-based labels.

⚡ Faster Resolution: Group recurring issues for faster response.

📊 Analytics Ready: Enables trend and problem management reporting.

🧠 Reusable Logic: Extendable to Change Requests or Catalog Items.
