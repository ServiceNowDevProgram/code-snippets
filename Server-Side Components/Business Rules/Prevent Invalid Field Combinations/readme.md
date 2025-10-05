In IT Service Management (ITSM), certain field combinations don’t make sense logically — for instance:
A High Priority incident should not have a Low Impact.
A Change Request marked as Emergency should not have Approval Type = Standard.
ServiceNow’s out-of-the-box (OOB) configurations can validate simple field requirements, but cannot enforce relational validation between two or more fields at the server-side level.
This custom Business Rule ensures data integrity by preventing users from saving or updating records when invalid field combinations occur.
