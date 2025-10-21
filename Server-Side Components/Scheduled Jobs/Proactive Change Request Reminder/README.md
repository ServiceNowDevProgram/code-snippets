**Proactive Change Request Reminder (Due in 24 Hours)**

**Description**
This Scheduled Job sends an automated email reminder to the assigned agent of each Priority 1 Change Request that is due within the next 24 hours.
It helps teams stay ahead of deadlines, prevent SLA breaches, and ensure timely change implementation.

**When to Use**
Use this script to ensure that high-priority change requests are addressed on time by proactively notifying assigned engineers.

**How It Works**
Checks all active change_request records with:
  - priority = 1
  - state not in "Closed" or "Complete"
  - due_date within the next 24 hours
Sends an email reminder to the assigned agent with the change number, description, and due date.

**Scheduled Job Configuration**
Recommended schedule:
- Run: Periodically  
- Repeat interval: 1 hour
