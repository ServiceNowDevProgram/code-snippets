## Enhanced_TableUtils Script Include extends out of the box TableUtils

It has a getFieldsAndAttributes() method that does not require a GlideRecord. Out of the box getFields() methods from either GlideRecord() or GlideRecordUtil() only work with an existing record and not just with the table name. This one goes to sys_dictionary directly and therefore does not need a valid GlideRecord to work.

**Usage**

```
var fields = new Enhanced_TableUtils('incident').getFieldsAndAttributes();
gs.debug('Field caller_id is of type ' + fields.caller_id.field_type + ' (to table ' + fields.caller_id.reference_table + ')');
```

**Output**

```
*** Script: [DEBUG] Field caller_id is a reference to table sys_user
```