🛑 Auto-Cancel Playbooks on Incident Deactivation

Script Type: Business Rule (Server-side)
Trigger: before update
Table: incident
Condition: active changes to false

📌 Purpose

Automatically cancel all active Playbooks (sys_pd_context) records associated with an incident when that incident is deactivated (e.g., closed or canceled). 

🧠 Logic

- Finds all active playbooks (not in completed,canceled) where:
- input_table is incident (or any other table)
- input_record matches current incident’s sys_id
- Cancels each playbook using: sn_playbook.PlaybookExperience.cancelPlaybook(playbookGR, 'Canceled due to the incident closure or cancellation.');
