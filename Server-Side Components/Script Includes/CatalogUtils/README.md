# CatalogUtils
This Script Include is a helper class for dealing with Service Catalog Items
and Requested Items.
## getCatalogVariables()
Returns all variables of a given RITM as stringified array of JSON objects. 
This method thus corresponds to the "Get Catalog Variables" action in a flow and 
it can be used both server-side and client-side.

A single JSON object has the following properties:

**Note:**\
Variable types with no values (e.g. containers) are excluded.

### Example for server-side call
```javascript
var grRITM = new GlideRecord('sc_req_item');

if (grRITM.get('485ae5bf2fc930105bd5d0e62799b662')) {
    var jsonVariables = JSON.parse((new CatalogUtils()).getVariables(grRITM));
}
```
### Example for client-side call
```javascript
var gaCatalogUtils = new GlideAjax('CatalogUtils');
	
gaCatalogUtils.addParam('sysparm_name', 'getVariables');
gaCatalogUtils.addParam('sysparm_ritm_sys_id', '485ae5bf2fc930105bd5d0e62799b662');

gaCatalogUtils.getXMLAnswer(function(strAnswer) {
	var jsonVariables = JSON.parse(strAnswer);
});

var jsonVariables = JSON.parse(gaCatalogUtils.getAnswer() || "");
```
### Example of returned values
```javascript
[
  {
    "strType": "8",
    "strName": "issued_by_name",
    "strQuestionText": "Issued by",
    "strValue": "62826bf03710200044e0bfc8bcbe5df1",
    "strDisplayValue": "Abel Tuter"
  },
  {
    "strType": "6",
    "strName": "issued_by_phone",
    "strQuestionText": "Phone",
    "strValue": "170",
    "strDisplayValue": "170"
  }
]
```

## Variables to Text

Returns all Variables with an answer as a formatted string.
Useful for 'exporting' question:answers to primitive fields such as description or notifications 
Expected use is Server side.

### Example of server-side call
```javascript
var grRITM = new GlideRecord('sc_req_item');

if (grRITM.get('8c135e0647b1b110da816241e36d437e')) {
    var jsonVariables = JSON.parse((new CatalogUtils()).variablesToText(grRITM));
}
```

### Example of returned values
```
Copier paper (reams):
>>3

Pens (box of 10):
>>3

Screen wipes (tube of 20):
>>4

Additional requirements:
>>I need this yesterday
```
