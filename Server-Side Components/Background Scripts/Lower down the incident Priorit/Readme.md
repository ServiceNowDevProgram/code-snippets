# Update P1 Incidents to P3 – ServiceNow Script

This script updates all Priority 1 (P1) incidents to Priority 3 (P3) in ServiceNow. It is useful for bulk downgrading incident priority based on revised impact or urgency assessments.

## 🧩 Purpose

To lower the priority of existing P1 incidents to P3 by adjusting their impact and urgency values.

## 🛠️ Script Details

- **Table**: `incident`
- **Target**: Incidents with `priority = 1`
- **Changes Made**:
  - `impact`: Changed from 1 (High) to 2 (Medium)
  - `urgency`: Changed from 1 (High) to 2 (Medium)
  - `priority`: Recalculated to 3 (P3)

## ▶️ How to Use

### Option 1: Background Script

1. Navigate to **System Definition > Scripts - Background**
2. Paste the script
3. Run it

### Option 2: Script Include

Wrap the logic in a Script Include and call it from a Flow, Business Rule, or UI Action.

