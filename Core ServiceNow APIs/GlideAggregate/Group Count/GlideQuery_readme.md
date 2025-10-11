# Group Count
Redo mostly similar example with GlideQuery

## Example Script
```javascript
var table = "sys_user";
var groupBy = "employee_number";
var minGroupCount = 2;

var countOutputGQ = getGroupCountGQ(
    table, groupBy, minGroupCount
);
gs.info('GlideQuery Output is ' + JSON.stringify(countOutputGQ, null, 4));

```
## Example Result
```json
[
 {
        "group": {
            "employee_number": "321"
        },
        "count": 10
    },
    {
        "group": {
            "employee_number": "657"
        },
        "count": 7
    },
    {
        "group": {
            "employee_number": "831"
        },
        "count": 3
    }
]
```