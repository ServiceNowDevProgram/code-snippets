# Get Field Values

Simple GlideAjax script to get field values from a specified record.  Can query fields including dot walked. 
Returns value and displayValue as JSON object.

```json
{
   "number": {
      "value": "INC0010051",
      "displayValue": "INC0010051"
   },
   "caller_id.email": {
      "value": "fran.zanders@example.com",
      "displayValue": "fran.zanders@example.com"
   },
   "short_description": {
      "value": "New Ticket",
      "displayValue": "New Ticket"
   },
   "state": {
      "value": "2",
      "displayValue": "In Progress"
   },
   "priority": {
      "value": "1",
      "displayValue": "1 - Critical"
   }
}
```


```javascript
function onLoad() {

    var ga = new GlideAjax("GetFieldValuesAjax");
    ga.addParam('sysparm_name', 'getValues');
    ga.addParam('sysparm_table_name', 'incident');
    ga.addParam('sysparm_sys_id', '915a93a9473d751001612c44846d4367');
    ga.addParam('sysparm_field_names', 'number,caller_id.email,short_description,state,priority');
    ga.getXMLAnswer(function(_answer) {
		var json = JSON.parse(_answer);
        console.log(JSON.stringify(json, '', 3));
    })

}
```

