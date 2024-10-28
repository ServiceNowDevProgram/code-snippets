# ValidateRequestedFor Client Script

## Description
This Client Script validates the "Requested For" field on a Service Catalog item form. If the "Requested For" field is empty, it displays an alert message and prevents the form from being submitted.

## Details
- **Trigger**: OnSubmit
- **Field**: Requested For
- **Table**: Service Catalog Item
- **Condition**: Always
  
- **Script**: 
  - Retrieves the value of the "Requested For" field.
  - Checks if the "Requested For" field is empty.
  - Displays an alert message if the field is empty.
  - Prevents the form from being submitted if the field is empty
