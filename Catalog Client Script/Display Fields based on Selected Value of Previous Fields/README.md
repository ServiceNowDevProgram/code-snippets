# DynamicDeliveryDate Catalog Client Script

## Description
This Catalog Client Script dynamically shows or hides the "Delivery Date" field based on the selected value of the "Delivery Method" field. If the "Delivery Method" is "Express", the "Delivery Date" field is shown; otherwise, it is hidden.

## Details
- **Trigger**: OnChange
- **Field**: Delivery Method
- **Table**: Catalog Item
- **Condition**: Always
- **Script**: 
  - Retrieves the value of the "Delivery Method" field.
  - Shows the "Delivery Date" field if the "Delivery Method" is "Express".
  - Hides the "Delivery Date" field for any other value of "Delivery Method".
