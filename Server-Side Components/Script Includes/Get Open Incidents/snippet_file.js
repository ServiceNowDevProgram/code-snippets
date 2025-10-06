
// IncidentHelper - Script Include
var IncidentHelper = Class.create();
IncidentHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
getOpenIncidents: function() {
 var gr = new GlideRecord('incident');
 gr.addQuery('active', true);
 gr.orderByDesc('sys_created_on');
 gr.setLimit(50);
 gr.query();

 var list = [];
 while (gr.next()) {
   list.push({
     number: gr.getValue('number'),
     short_description: gr.getValue('short_description'),
     sys_id: gr.getValue('sys_id'),
     priority: gr.getValue('priority')
   });
 }
 return JSON.stringify(list);
},
type: 'IncidentHelper'
});
