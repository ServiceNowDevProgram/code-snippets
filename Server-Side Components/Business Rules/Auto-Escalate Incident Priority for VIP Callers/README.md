# Auto-Escalate Incident Priority for VIP Callers

## Description

A **Before Business Rule** on the `incident` table that automatically escalates the priority, urgency, and impact of an incident to **1 - Critical** whenever the caller is flagged as a VIP user in ServiceNow.

This prevents high-priority incidents from being logged at incorrect severity levels due to human error during intake.

## Rule Configuration

| Field       | Value                          |
|-------------|-------------------------------|
| Table       | `incident`                    |
| When        | `before`                      |
| Insert      | ✅ Yes                         |
| Update      | ✅ Yes                         |
| Condition   | `current.caller_id.changes()` |

## Prerequisites

- The `sys_user` table must have a **Boolean** field named `vip` (this is a default field in most ServiceNow instances).
- The Business Rule runs **before** insert/update so the escalated values are saved on first write — no additional update needed.

## Usage

1. Navigate to **System Definition → Business Rules** in your ServiceNow instance.
2. Click **New** and set the table to `incident`.
3. Set **When** to `before`, and check both **Insert** and **Update**.
4. Add the condition: `current.caller_id.changes()`
5. Under the **Advanced** tab, paste the script from `auto_escalate_vip_incident.js`.
6. Save and test by creating an incident with a VIP caller.

## Example Output

When an incident is submitted for a VIP caller, the following fields are automatically set:

- **Priority:** 1 - Critical  
- **Urgency:** 1 - High  
- **Impact:** 1 - High  
- **Work Notes:** `Priority automatically escalated to Critical. Caller John Doe is a VIP user.`

## Notes

- To mark a user as VIP, go to their `sys_user` record and set the **VIP** field to `true`.
- This rule fires on every update where `caller_id` changes, so reassigning a ticket to a VIP caller mid-lifecycle also triggers the escalation.
- Pair this with a notification rule to alert the on-call team when a Critical incident is auto-created.
