# Create P1 Incident – ServiceNow Script

This script automates the creation of a **Priority 1 (P1)** Incident in ServiceNow. It is useful for testing, automation, or simulating critical incident scenarios.

## 🧩 Purpose

To quickly generate a high-priority incident record with predefined values for urgency, impact, and description.

## 🛠️ Script Details

- **Table**: `incident`
- **Priority**: 1 (High Impact + High Urgency)
- **Fields Set**:
  - `short_description`: "Critical system outage"
  - `description`: Detailed explanation of the issue
  - `impact`: 1 (High)
  - `urgency`: 1 (High)
  - `priority`: 1 (Calculated)
  - `assignment_group`: Example group (`NETWORK_SUPPORT`)
  - `caller_id`: Current logged-in user

## ▶️ How to Use

### Option 1: Background Script

1. Navigate to **System Definition > Scripts - Background**
2. Paste the script
3. Run it

### Option 2: Script Include

Wrap the logic in a Script Include and call it from a Flow, Business Rule, or UI Action.

## 🧪 Example Output

