var countAssignedUtil = Class.create();
countAssignedUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {

 getCount: function() {
   var ga = new GlideAggregate('incident');
   ga.addQuery('assigned_to', this.getParameter('sysparm_assignedto'));
   ga.addAggregate('COUNT', 'assigned_to');
   ga.query();
   while (ga.next()) {
     var assignedIncident = ga.getAggregate('COUNT', 'assigned_to');
     return assignedIncident;
   }
 },
 type: 'countAssignedUtil'
});
