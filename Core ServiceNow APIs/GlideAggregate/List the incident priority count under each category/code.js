// Get the count of Incidents by Category and then by Priority.

var incCATGR = new GlideAggregate('incident');
incCATGR.addAggregate('COUNT', 'category');
incCATGR.orderBy('category');
incCATGR.query();

while (incCATGR.next()) {
	var cat = incCATGR.category;
	gs.print("Category Name: " +incCATGR.category.getDisplayValue() + ' --> ' + incCATGR.getAggregate('COUNT', 'category'));
  var incPriorityGR = new GlideAggregate('incident');
	incPriorityGR.addQuery('category', incCATGR.category);
  incPriorityGR.addAggregate('COUNT', 'priority');
	incPriorityGR.orderBy('priority');
  incPriorityGR.query();

	while(incPriorityGR.next()){
    gs.print("Priority-" +incPriorityGR.priority + " = " +incPriorityGR.getAggregate('COUNT', 'priority'));
	}
}
