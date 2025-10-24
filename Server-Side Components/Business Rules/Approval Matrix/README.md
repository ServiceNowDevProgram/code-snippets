# ServiceNow Approval Matrix Generator  
**A Dynamic, Data-Driven Approval Workflow Engine for ServiceNow**

---

## Overview

The **Approval Matrix Generator** is a configurable engine that automates approval generation in ServiceNow based on business rules —  
without hard-coding approvers or creating dozens of Flow Designer flows.  

By maintaining a simple **Approval Matrix table**, you can define which user or role should approve a request dynamically (e.g., based on department and amount).  
This approach provides scalability, maintainability, and full visibility across all approval logic.

---

## Key Highlights

✅ 100% native ServiceNow solution (no plugins)  
✅ Centralized approval logic in a single configuration table  
✅ Works for ITSM, HRSD, Finance, or Procurement workflows  
✅ Supports multi-level approvals (Manager → Director → CFO)  
✅ Can run via **Business Rule** 

---

## Use Case

An organization wants dynamic approval routing for procurement or HR requests based on:
- Department (IT, HR, Finance)
- Request amount (₹0–₹10,000, etc.)
- Approval role (Manager, Director, VP)

Instead of building multiple flows, the Approval Matrix defines all rules in a single table.  
When a new request is submitted, the script automatically finds and assigns the correct approvers.

---

## Step 1 — Create Table `u_approval_matrix`

| Field | Type | Description |
|--------|------|-------------|
| **u_department** | Reference (sys_user_group) | Department owning the rule |
| **u_min_amount** | Decimal | Minimum amount for range |
| **u_max_amount** | Decimal | Maximum amount for range |
| **u_role** | Choice | Role type – Manager / Director / VP |
| **u_approver** | Reference (sys_user) | Direct approver (optional) |

This table drives all the logic.  
Example data:

| Department | Min | Max | Role | Approver |
|-------------|-----|-----|------|-----------|
| IT | 0 | 5000 | Manager | *(blank)* |
| IT | 5000 | 10000 | Director | *(blank)* |
| Finance | 0 | 10000 | *(blank)* | John CFO |

---

## ⚙️ Step 2 — Business Rule Script

**Table:** `sc_request` (or your custom table)  
**When:** After Insert  
**Condition:** Approval required

## Example Input (Request Record)
| Field         | Value             |
| ------------- | ----------------- |
| Requested For | Ravi Gaurav       |
| Department    | IT                |
| Amount        | 8000              |
| Category      | Hardware Purchase |

## Example Output
| Field                | Value                                     |
| -------------------- | ----------------------------------------- |
| Matched Rule         | IT, 5000–10000, Role = Director           |
| Approver Found       | Ravi’s Director (from `u_director` field) |
| Approval State       | Requested                                 |
| sysapproval_approver | Created Automatically                     |
