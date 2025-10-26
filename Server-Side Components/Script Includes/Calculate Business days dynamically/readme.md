# Business Day Calculator for ServiceNow

This JavaScript function calculates a future date by adding a specified number of **business days** (excluding weekends) to a given date.


##  Features
- Skips weekends (Saturday and Sunday)
- Works with any number of business days
- Uses ServiceNow's `GlideDateTime` API

##  Usage
1. Copy the function into a **Script Include**, **Business Rule**, or **Scheduled Job** in ServiceNow.
2. Call the function with:
   - A valid date string (e.g., `'2025-10-24 12:00:00'`)
   - The number of business days to add (e.g., `5`)

##  Example
```javascript
gs.print(add_business_days('2025-10-24 12:00:00', 5));
// Output: 2025-10-31 (skips weekend)
