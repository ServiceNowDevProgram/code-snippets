Business Service Lookup Fetch When CI Changes

This code snippet dynamically fetches and filters Business Services based on the selected Configuration Item (CI) in the change request forms. It ensures accurate service mapping, improves user experience, and supports compliance in Change Management and other ITSM workflows.

Features
-Filters Business Services based on CI relationships
-Supports Script Includes and Client Script
-Compatible with Change Request forms and scoped apps
-Reusable across multiple catalog items and modules

Use Case
When a user selects a CI (e.g., server, application), the form should only show Business Services linked to that CI. This avoids incorrect selections and enforces service ownership logic. This also checks for orphaned relationships by logging the details in Sytem Logs where a CI has no linked Business Services to avoid empty dropdowns.

