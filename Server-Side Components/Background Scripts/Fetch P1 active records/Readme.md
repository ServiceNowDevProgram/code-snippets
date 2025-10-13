# Fetch Active P1 Incidents – ServiceNow Background Script

This script retrieves all **active incidents** with **Priority 1 (P1)** from the ServiceNow `incident` table. It is useful for monitoring critical issues that are still unresolved.

## 🧩 Purpose

To identify and list all high-priority incidents that are currently active, enabling quick review and escalation if needed.

## 🛠️ Script Details

- **Table**: `incident`
- **Filters Applied**:
  - `active = true`
  - `priority = 1` (P1)

## ▶️ How to Use

1. Navigate to **System Definition > Scripts - Background**
2. Paste the script into the editor
3. Click **Run Script**

## 🧪 Example Output
