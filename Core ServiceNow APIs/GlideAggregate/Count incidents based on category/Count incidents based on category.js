var incidents = new GlideAggregate('incident');
incidents.addAggregate('count', 'category');
incidents.orderBy('category');
incidents.query();
while(incidents.next())
{
var categories = incidents.category;
var count = incidents.getAggregate('count', 'category');
gs.info('Total number of ' +categories + ' categories are '+count);
}
