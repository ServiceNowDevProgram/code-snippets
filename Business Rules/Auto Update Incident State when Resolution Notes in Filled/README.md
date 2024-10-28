# AutoResolveIncident Business Rule

## Description
This Business Rule automatically updates the "State" field of an Incident to "Resolved" when the "Resolution Notes" field is filled.

## Details
- **Trigger**: Before Update
- **Table**: Incident
- **Condition**: `current.resolution_notes` is not empty
- **Script**: 
  - Checks if the "Resolution Notes" field is filled.
  - If filled, updates the "State" field to "Resolved".
