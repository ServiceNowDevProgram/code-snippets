var ga = new GlideAggregate('table_name');
ga.addQuery('field_name', 'field_value');
ga.addAggregate('COUNT');
ga._query();

if(ga._next()) {
	//Your code goes here
	//ga.getAggregate('COUNT')
}