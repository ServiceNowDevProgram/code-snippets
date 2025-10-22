#  Recursive GlideRecord Fetcher
##  Overview
This snippet provides a reusable logic to recursively fetch child records from a parent record in ServiceNow. It is useful for traversing hierarchical relationships such as tasks, categories, CMDB CI relationships, or any table with a parent-child structure.

The logic prevents infinite loops by tracking visited records and supports nesting of children for structured output.

---

##  Use Case
- Fetch all subtasks under a parent task.
- Traverse CMDB CI relationships recursively.
- Build hierarchical views of organizational units or categories.

---

##  Parameters
| Parameter        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `tableName`      | Name of the table to query (e.g., `task`, `cmdb_ci`, `custom_table`)        |
| `parentField`    | Field that links to the parent record (e.g., `parent`, `parent_id`)         |
| `parentSysId`    | Sys ID of the root parent record to start traversal                         |

---

##  Example Usage
```javascript
var fetcher = new RecursiveFetcher('task', 'parent');
var hierarchy = fetcher.fetchChildren('abc123sysid'); // Replace with actual parent sys_id
gs.info(JSON.stringify(hierarchy));
