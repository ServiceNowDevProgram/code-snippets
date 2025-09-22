# Extending the baseline TableUtils Script Include

This code snippet extends the out of the box __Table Utils__ Script Include by adding a method to retrieve all fields -and the properties- of a given table. There is already a baseline API called _getFields()_ that does the same, but it required an existing GlideRecord to perform it. There are cases where we want the fields of a table without necessarily having a GlideRecord.

The code snippet also shows how to extend an existing class and how to invoke the parent class constructor to ensure proper behavior.

It is invoked like this:
```
new EXT_TableUtils(<table_name>).getFieldsAndAttributes();
```

So for example with the _incident_ table:
```
var fields = new EXT_TableUtils('incident').getFieldsAndAttributes();
for (var fieldName in fields) {
    gs.debug('Field ' + fieldName + ' is of type ' + fields[fieldName].field_type);
}
```

And returns a JSON structure of this format:
```
{
    <field_name_1>: {
        field_label: <label>,
        field_size: <size>,
        field_type: <type>,
        reference_table: <table> (only for reference or glide_list types)
    },
    <field_name_2>: {
        ...
    }
}
```



