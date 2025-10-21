# Active Incidents JSON Export – ServiceNow

This repository contains **two approaches** to fetch active incidents from ServiceNow and convert them to JSON. Both use `GlideRecord` but differ in flexibility and readability.

---

## 1. Simple Approach

This method fetches a **fixed set of fields** and converts them directly to JSON.

```javascript
var incidents = [];
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.query();
while (gr.next()) {
    incidents.push({
        number: gr.number.toString(),
        short_description: gr.short_description.toString(),
        state: gr.state.toString(),
        assigned_to: gr.assigned_to.getDisplayValue('name'),
        created_on: gr.sys_created_on.getDisplayValue()
    });
}

var jsonOutput = JSON.stringify(incidents);
gs.info(jsonOutput);
```

### ✅ Pros
- Simple and easy to implement
- Works fine for a fixed set of fields
- Direct JSON output

### ❌ Cons
- Fields are hard-coded → not reusable for other tables
- Reference fields handling is not dynamic
- Numeric state values are not human-readable

---

## 2. Flexible & Dynamic Approach

This method allows dynamic fields, handles reference fields, and adds human-readable state labels.

```javascript
var tableName = 'incident';
var fieldsToInclude = ['number', 'short_description', 'state', 'assigned_to', 'sys_created_on'];
var incidentList = [];

var gr = new GlideRecord(tableName);
gr.addQuery('active', true);
gr.query();

while (gr.next()) {
    var incidentObj = {};
    
    fieldsToInclude.forEach(function(field) {
        if (gr.isValidField(field) && gr[field].getRefRecord) {
            incidentObj[field] = gr[field].getDisplayValue();
        } else if (gr.isValidField(field)) {
            incidentObj[field] = gr[field].toString();
        } else {
            incidentObj[field] = null;
        }
    });

    // Map numeric state to human-readable label
    var stateMap = {
        '1': 'New',
        '2': 'In Progress',
        '3': 'On Hold',
        '6': 'Resolved',
        '7': 'Closed'
    };
    incidentObj.state_label = stateMap[incidentObj.state] || 'Unknown';

    incidentList.push(incidentObj);
}

var jsonOutput = JSON.stringify(incidentList, null, 2);
gs.info("Here's your JSON for active incidents:\n" + jsonOutput);
```

### ✅ Pros
- Dynamic → easily reusable for any table and fields
- Handles reference fields gracefully
- Adds human-readable state labels
- JSON is formatted for readability
- Checks `isValidField` to prevent errors

### ❌ Cons
- Slightly more complex than the simple version
- Requires manual mapping for fields like state labels


## Summary

- **Simple Approach**: Best for quick tasks with fixed fields
- **Flexible Approach**: Best for reusable scripts, handling dynamic tables, reference fields, and human-readable output