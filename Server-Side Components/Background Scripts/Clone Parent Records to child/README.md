# CloneParentRecords.js

This background script copies records from a parent table into a child table in ServiceNow. It's intended to be run from the Scripts - Background module (or adapted into a Script Include / scheduled job).

## Purpose

The script iterates parent records that match a query and creates corresponding records in a child table. Optionally it preserves a reference to the parent record by storing the parent's `sys_id` on the child record.

## Configuration (what to edit)
Open `CloneParentRecords.js` and update these values to match your instance:

- `x_parent_table` – change to your parent table name (e.g. `incident`).
- `your Query` – replace with a Glide encoded query or condition (e.g. `active=true^priority=1`).
- `x_child_table` – change to your child table name.
- Field mappings – modify the lines that copy fields (`short_description`, `description`, etc.) to match the fields you want to clone.
- `childGR.parent` – change this to the child-side reference field name if different.

## How to run

1. In your ServiceNow instance go to **System Definition > Scripts - Background**.
2. Paste the script content from `CloneParentRecords.js` into the editor.
3. Test first on a limited dataset by changing the query to return a small set (or by using `parentGR.setLimit(n)` before `query()` if appropriate).
4. Click **Run script**.

Alternatively, convert the logic into a Script Include and call it from a Scheduled Job for repeatable, controlled execution.

## Safety & performance notes

- Always run in a sub-production (development or test) instance first.
- If the parent table contains many records, run in batches. Large transactions can time out or lock tables.
- Consider adding `parentGR.setLimit(1000)` or using ranges (for example, by sys_created_on or sys_id ranges) to process data in chunks.
- Use `gs.info()` for progress logging. For very large operations, consider using an asynchronous approach (Scheduled Jobs, Event-driven, or Import Set transform).
- Ensure the user running the script has write access to the child table fields being created.

## Error handling suggestions

- Wrap critical operations with try/catch in a Script Include version and log errors to a custom table or `syslog`.
- Validate required fields before `insert()` to avoid runtime field validation errors.

## Example modifications

- To avoid copying every record, change the query to: `parentGR.addQuery('active', true);` or `parentGR.addEncodedQuery('active=true^priority=1');`
- To map additional fields: `childGR.u_custom = parentGR.u_custom;` (replace `u_custom` with your field names).



