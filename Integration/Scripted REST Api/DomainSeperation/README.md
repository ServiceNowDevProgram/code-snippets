---
# PR Description:

This pull request adds a Scripted REST API for ServiceNow that creates Incident records in the domain and company of the authenticated user. The API was developed as part of a Hacktoberfest 2025 contribution and is intended for educational and demonstration purposes. The `create` method ensures incidents are scoped to the user's domain, supporting multi-tenancy and domain separation best practices.
---

# Pull Request Checklist

## Overview

- [x] I have read and understood the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines
- [x] My pull request has a descriptive title that accurately reflects the changes
- [x] I've included only files relevant to the changes described in the PR title and description
- [x] I've created a new branch in my forked repository for this contribution

## Code Quality

- [x] My code is relevant to ServiceNow developers
- [x] My code snippets expand meaningfully on official ServiceNow documentation (if applicable)
- [x] I've disclosed use of ES2021 features (if applicable)
- [x] I've tested my code snippets in a ServiceNow environment (where possible)

## Repository Structure Compliance

- [x] I've placed my code snippet(s) in one of the required top-level categories:
  - `Server-Side Components/`
- [x] I've used appropriate sub-categories within the top-level categories
- [x] Each code snippet has its own folder with a descriptive name

## Documentation

- [x] I've included a README.md file for each code snippet
- [x] The README.md includes:
  - [x] Description of the code snippet functionality
  - [x] Usage instructions or examples
  - [x] Any prerequisites or dependencies
  - [x] (Optional) Screenshots or diagrams if helpful

## Restrictions

- [x] My PR does not include XML exports of ServiceNow records
- [x] My PR does not contain sensitive information (passwords, API keys, tokens)
- [x] My PR does not include changes that fall outside the described scope

---

````markdown
# 🎃 Hacktoberfest 2025 Contribution: ServiceNow Scripted REST API

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

## 📥 Expected Request Format

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

## 📚 How It Works

1. Extracts the `short_description` from the incoming JSON payload.
2. Identifies the authenticated user via `gs.getUserID()`.
3. Retrieves the user's domain and company using `sys_user`.
4. Creates a new `incident` record with the user's domain, company, and description.
5. Returns the incident number and domain in the response.

---

## 🧪 Testing Tips

- Use a valid ServiceNow PDI with Scripted REST API enabled.
- Ensure the user is authenticated before making requests.
- Check the `incident` table for newly created records.

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to improve this script or adapt it for other use cases, feel free to fork and submit your changes.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
