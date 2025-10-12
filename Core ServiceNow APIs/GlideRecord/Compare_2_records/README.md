# Compare Two Records Using GlideRecord

This snippet compares two records from the same table in ServiceNow field-by-field using the **GlideRecord API**.  
It’s useful for debugging, verifying data after imports, or checking differences between two similar records.

---

## Working 
The script:
1. Retrieves two records using their `sys_id`.
2. Iterates over all fields in the record.
3. Logs any fields where the values differ.

---

## Usage
Run this script in a **Background Script** or **Fix Script**:

```js
compareRecords('incident', 'sys_id_1_here', 'sys_id_2_here');
```

## Example Output
```js
short_description: "Printer not working" vs "Printer offline"
state: "In Progress" vs "Resolved"
priority: "2" vs "3"
Comparison complete.
```