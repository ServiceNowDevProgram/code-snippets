# Extract User Roles from JSON

---

## Overview
This ServiceNow background script takes a JSON of usernames and their titles (roles) and groups all roles under each **unique user**.  
It prints the result in the **System Logs** in ServiceNow. This helps admins quickly see **unique users and all their roles**, avoiding duplicates.

---

## Use Case
For example, if a user appears multiple times with different roles:

- `tammie.schwartzwalde` appears as both:
  - Senior Auditor
  - Payroll Generalist  

The script will show **all roles together** for that user, without repeating duplicates.

---

## Script Details

| Field | Value |
|-------|-------|
| Table | N/A (JSON based) |
| Type | Background Script |
| Author | Sachin Narayanasamy |
| Language | JavaScript (GlideRecord) |

---

## Logic Flow
1. Define the JSON array of user details.  
2. Create an object to hold **unique users** and their roles.  
3. Loop through each JSON entry:
   - Trim and validate the title.
   - Add it to the user's array if it doesn’t already exist.  
4. Log each user and their unique roles.  
5. Display the total number of unique users.

---

## Example Output
User: dennis.millar having Role(s): Account Exec Northeast
User: ashley.parker having Role(s): Director
User: steve.schorr having Role(s): Investigations Generalist
User: tammie.schwartzwalde having Role(s): Senior Auditor, Payroll Generalist
User: tommy.tom having Role(s): Tester
Total unique users: 5
