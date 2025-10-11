# Auto-Generate Knowledge Article from Resolved Incident

## Overview
This ServiceNow Business Rule automatically creates a draft Knowledge Article when an Incident is resolved and contains resolution notes. It helps promote knowledge reuse and reduces repetitive tickets by capturing solutions directly from resolved Incidents.

## Features
- Triggered when an Incident is moved to the "Resolved" state.
- Checks for presence of resolution notes (`close_notes`).
- Creates a draft Knowledge Article with the Incident number and resolution content.
- Tags the article with a default category (`General`).
- Optionally links the article to the source Incident via a custom field.

## Business Rule Configuration
- **Table**: `incident`
- **When to Run**: `after update`
- **Condition**:
  ```javascript
  current.state == 6 && current.close_notes
