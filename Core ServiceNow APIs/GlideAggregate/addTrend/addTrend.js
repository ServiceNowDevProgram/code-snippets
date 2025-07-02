
var trend = new GlideAggregate('incident');  
trend.addTrend('closed_at','month');
trend.addQuery('assignment_group','assignment_group_sysid');
trend.addQuery('state',7);  // Closed state
trend.addAggregate('COUNT');  
trend.query();  
while(trend.next()) {  
   gs.print(trend.getValue('timeref') + ': ' + trend.getAggregate('COUNT'));  
}  