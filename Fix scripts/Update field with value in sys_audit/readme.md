Hopefully this is something you never need to use.   It will udpate with either the newest or oldest entry from sys_audit.

## Example

```Javscript
var updateArgs = {
    encodedQuery: 'u_some_cool_field=blahblahblahL',
    table: 'my_cool_table',
    updateField: 'field to update in target table',
    auditField: 'field name in sys_audit',
    sort: 'DESC'
}


try {

    gs.print(updateRecords(updateArgs).join('\n'));
} catch (ex) {
    gs.error(ex.message || ex);
}

```
