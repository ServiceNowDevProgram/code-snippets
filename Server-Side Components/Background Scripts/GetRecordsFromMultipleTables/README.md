A background script that retrieves record counts from multiple ServiceNow tables with date filtering, providing a comprehensive data audit report.

## What It Does

The script:
1. Defines an array of table names to query (60+ tables by default)
2. Iterates through each table using `forEach()` to process them systematically
3. Uses `GlideAggregate` with COUNT aggregate for efficient record counting
4. Applies a date filter to count records updated before a specific date
5. Handles errors gracefully with try-catch blocks for invalid table names
6. Outputs results in a formatted table structure with pipe separators


## Sample Output

```
| Table |    Records 
| customer_account |    1,245 records
| cmn_location |    87 records
| customer_contact |    3,456 records
| cmdb_ci |    12,789 records
We've got an error for table: invalid_table_name
```

## Configuration Options

- **Date filtering**: Modify `sys_updated_on<=javascript:gs.dateGenerate('YYYY-MM-DD','HH:mm:ss')` to change the cutoff date
- **Custom table list**: Replace the `tablesList` array with your specific tables of interest
- **Additional filters**: Add more encoded query conditions like `active=true` or specific field criteria