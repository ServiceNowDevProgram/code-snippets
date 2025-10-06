# IncidentHelper - getOpenIncidents

**Purpose:** Script Include (client-callable via GlideAjax) that returns a JSON array of active incident records.

**Usage Example**
```js
var ga = new GlideAjax('IncidentHelper');
ga.addParam('sysparm_name','getOpenIncidents');
ga.getXMLAnswer(function(response){
  var list = JSON.parse(response || '[]');
  console.log(list);
});
