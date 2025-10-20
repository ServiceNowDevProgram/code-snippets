A background script that aggregates incident records by category and counts how many incidents exist in each category. 

## How it works 

The script: 
1. Creates a `GlideAggregate` query on the "incident" table.
2. Adds a COUNT aggregation on the "category" field to count the incidents per category.
3. Orders results alphabetically by category.
4. Executes the query and loops through the results.
5. Logs the counts for each category to the system log.

## Sample Output 

```
The total number of Hardware categories is 25
The total number of Network categories is 42
The total number of Software categories is 58
```

## Configuration Options 

- **Variable naming**: The `categories` should be a singular "category" since it holds one value at a time.
- **Missing encoding**: It should use `incidents.getValue('category') for proper encoding.
- **No null handling**: Any categories with no value will show as empty.
