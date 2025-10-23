**Duplicate Incident Detection and Creation**

**Description**
This inbound email action detects duplicate incidents from incoming emails and either updates existing incidents or creates a new one.

- Duplicate Found: Updates the existing incident's work notes with the new email content and aborts new incident creation.
- No Duplicate Found: Creates a new incident with the email subject as short description and the email body as description.

**Use Case**
When multiple users report the same issue via email, this automation prevents duplicate incidents, keeping the incident queue cleaner and improving triage efficiency.

**Inbound Action Configuration**
- Target Table: incident 
- Action Type: Record Action
- Type: New

**How It Works**
1. The inbound email action scans the email subject for matches against active incidents whose short description contains the subject excluding Closed or Cancelled incidents.   
2. If a matching incident is found:
   - Updates the incident's work notes with the email content.
   - Aborts creation of a new incident.  
3. If no match is found:
   - Creates a new incident using the email subject as the short description and the email body as the description.
