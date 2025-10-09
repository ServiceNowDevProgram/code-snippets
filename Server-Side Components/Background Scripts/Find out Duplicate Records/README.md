# Duplicate Records Scripts Overview

# Duplicate Records.js

This script identifies duplicate values in a specific field of a fixed table (`incident`) and logs how many times each duplicate occurs.

- Uses `GlideAggregate` to count and group by the `number` field.
- Logs each duplicate record directly to the console.
- Limited to the `incident` table and `number` field.
- No output array is returned; results are only printed.

---

# Duplicate Records for any table based on field.js

This script finds duplicate records in **any table** based on a specified field and returns an array of values from fields you choose.

- Uses `GlideAggregate` to detect duplicates and `GlideRecord` to retrieve full record details.
- Function name: `findDuplicateRecords`
- Accepts three parameters:
  - `tableName`: the table to search
  - `fieldName`: the field to check for duplicates
  - `outputFields`: an array of field names to include in the output
- Logs each duplicate record as a structured JSON object.
- Returns a readable array of objects containing the specified output fields.
