# ServiceNow Scripted REST API for creating incdents in the correct company/domain

## Overview

The API allows authenticated users to create new **Incident** records within their own domain and company context.

> **DISCLAIMER**  
> This script was developed and tested on a **ServiceNow Personal Developer Instance (PDI)**.  
> It is intended for **educational and demonstration purposes only**.  
> Please **test thoroughly in a dedicated development environment** before deploying to production.

---

## Features

- Creates a new Incident record for the currently logged-in user.
- Automatically assigns the user's domain and company to the incident.
- Returns the generated incident number and domain in the response.

---

## Prerequisites & Dependencies

Before using or testing this Scripted REST API, ensure the following conditions are met:

1. **Domain Separation Plugin**

   - The **Domain Separation** plugin must be activated on your instance.
   - This enables `sys_domain` references and ensures incidents are created within the correct domain context.

2. **Core Data Setup**

   - Ensure valid entries exist in the **core_company** table.
   - Each company should have an associated **domain** record in the **sys_domain** table.
   - These relationships are critical for correct domain assignment during incident creation.

3. **User Configuration**

   - The user invoking this API must:
     - Belong to a specific domain.
     - Have the **snc_platform_rest_api_access** role to access Scripted REST APIs.
   - Users must also have ACL permissions to:
     - **Read** from the `sys_user` table.
     - **Insert** into the `incident` table.

4. **Instance Configuration**
   - Tested and validated on a **ServiceNow Personal Developer Instance (PDI)**.
   - Other environments should be configured with equivalent domain and company data for consistent results.

---

## Information

- **Author**: Anasuya Rampalli ([anurampalli](https://github.com/anurampalli))
- **Version**: 1.0
- **Date**: 2025-10-08
- **Context**: Scripted REST API (`create` function)
- **Tested On**: ServiceNow Personal Developer Instance (PDI)

---

## Expected Request Format

```json
POST /api/your_namespace/your_endpoint
Content-Type: application/json

{
  "short_description": "Issue description text"
}
```
````

---

## Response Examples

### Success

```json
{
  "status": "success",
  "incident_id": "INC0012345",
  "domain": "TOP/Child Domain"
}
```

### Error

```json
{
  "error": {
    "message": "User Not Authenticated",
    "detail": "Required to provide Auth information"
  },
  "status": "failure"
}
```

---

## How It Works

1. Extracts the `short_description` from the incoming JSON payload.
2. Identifies the authenticated user via `gs.getUserID()`.
3. Retrieves the user's domain and company using `sys_user`.
4. Creates a new `incident` record with the user's domain, company, and description.
5. Returns the incident number and domain in the response.

---

## Testing Tips

- Use a valid ServiceNow PDI with Scripted REST API enabled.
- Ensure the user is authenticated before making requests.
- Check the `incident` table for newly created records.

---

