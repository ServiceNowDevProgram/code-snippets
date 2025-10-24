# ServiceNow Automatic Relationship Builder  
**Auto-create CMDB relationships dynamically on CI insert or update**

---

## Overview

The **Automatic Relationship Builder** ensures that your CMDB stays complete and accurate by automatically creating parent–child relationships between Configuration Items (CIs) whenever they are inserted or updated.  

Instead of manually linking servers, applications, and databases, this Business Rule dynamically establishes **"Runs on"**, **"Depends on"**, or **"Connected to"** relationships based on CI attributes.

---

## Key Highlights

Builds CMDB relationships automatically  
Eliminates manual linking of dependent CIs  

---

## Use Case

When a new **Application CI** is created or discovered and its **host CI (server)** is known,  
the script automatically builds a relationship of type **“Runs on::Runs”** between the two.

This keeps your CMDB up-to-date without human intervention.

---

## Table and Trigger

| Item | Value |
|------|-------|
| **Table** | `cmdb_ci_appl` |
| **Trigger** | After Insert / After Update |
| **Condition** | `u_host` field is populated |
| **Purpose** | Create a “Runs on” relationship between host and application |

---

## Script — Business Rule


Business Rule: Auto Relationship Builder
Table: cmdb_ci_appl
When: after insert / after update

## Example Input (New CI Record)
| Field  | Value                        |
| ------ | ---------------------------- |
| Name   | Payroll Application          |
| Class  | Application (`cmdb_ci_appl`) |
| u_Host | APP-SERVER-01                |
| Owner  | IT Operations                |

## Example Output (Created Relationship)

| Field  | Value               |
| ------ | ------------------- |
| Parent | APP-SERVER-01       |
| Child  | Payroll Application |
| Type   | Runs on :: Runs     |
| Table  | cmdb_rel_ci         |
Relationship automatically visible in CI Relationship Viewer.


