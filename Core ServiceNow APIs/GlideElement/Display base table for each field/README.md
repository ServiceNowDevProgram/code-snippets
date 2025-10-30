# Display Base Table for Each Field

This code snippet demonstrates how to identify the base table where each field originates from in ServiceNow's table inheritance hierarchy.

## Functionality

The script uses `GlideRecordUtil` to retrieve all parent tables for a given table, then iterates through each field in a record to display which base table the field was defined in using the `getBaseTableName()` method from the GlideElement API.

## Use Case

This is particularly useful when working with extended tables to understand:
- Which fields are inherited from parent tables
- Which fields are defined locally on the current table
- The complete table inheritance structure

## Example Output

For a table like `db_image`, the output shows each field name alongside its originating table:
```
Fields          Base table
sys_id          sys_metadata
sys_created_on  sys_metadata
image           db_image
name            db_image
...
```

## Related Methods

- `getBaseTableName()` - Returns the name of the table where the field was originally defined
- `GlideRecordUtil.getTables()` - Returns parent tables in the inheritance hierarchy
- `GlideRecordUtil.getFields()` - Returns an array of all field names for a GlideRecord
