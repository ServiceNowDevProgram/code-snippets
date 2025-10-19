A background script that generates a comprehensive report showing the total number of incidents grouped by priority level in your ServiceNow instance.

## What It Does

The script:
1. Creates a GlideAggregate query on the incident table
2. Groups incidents by their priority field
3. Counts the total number of incidents for each priority level
4. Handles cases where priority is not set (displays as "No Priority Set")
5. Outputs a formatted report showing priority names and their corresponding counts

## Sample Output

```
Priority: 1 - Critical | Count: 15
Priority: 2 - High | Count: 47
Priority: 3 - Moderate | Count: 123
Priority: 4 - Low | Count: 89
No Priority Set | Count: 3
```

## Configuration Options

- **Date filtering**: Add `.addQuery('opened_at', 'DATEPART', 'Today@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)')` to get today's incidents only
- **State filtering**: Add `.addQuery('state', '!=', 7)` to exclude closed incidents
- **Assignment filtering**: Add `.addQuery('assignment_group', 'group_sys_id')` to focus on specific teams