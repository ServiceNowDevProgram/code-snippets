var trend = new GlideAggregate('incident');  
trend.addTrend ('closed_at','month');
trend.addQuery('priority',1);
trend.addQuery('state',7);  
trend.addAggregate('COUNT');  
trend.query();  
while(trend.next()) {  
   gs.print(trend.getValue('timeref') + ': ' + trend.getAggregate('COUNT'));  
}  
gs.print('Total closed incidents: ' + trend.getTotal('COUNT')); 