# Enhance Incident Description with Linked Problem Statement

## Overview
This ServiceNow Business Rule enhances Incident records by automatically appending the short description of a linked Problem record. It improves visibility and context for support teams working on related incidents.

## Features
- Triggered when a Problem ID is newly linked or changed on an Incident.
- Fetches the Problem's short description and number.
- Appends the Problem Statement to both the Incident's short description and description fields.
- Includes general error handling to ensure stability.

## Business Rule Configuration
- Table: `incident`
- When to Run: `before insert` and `before update`
- Condition: 
  ```javascript
  current.problem_id.changes() || !previous
