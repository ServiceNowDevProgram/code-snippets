---
# PR Description:

This pull request adds a Scripted REST API for ServiceNow that creates Incident records in the domain and company of the authenticated user. The API was developed as part of a Hacktoberfest 2025 contribution and is intended for educational and demonstration purposes. The `create` method ensures incidents are scoped to the user's domain, supporting multi-tenancy and domain separation best practices.
---

# ServiceNow Scripted REST API for creating incdents in the correct company/domain

## Overview

This repository contains a **Scripted REST API** developed for **ServiceNow** as part of a Hacktoberfest 2025 contribution. The API allows authenticated users to create new **Incident** records within their own domain and company context.

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

## Script Details

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
