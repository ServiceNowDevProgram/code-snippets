var grCI = new GlideRecord('cmdb_ci');
//Specify the threshold days
var daysThreshold = 30;
var dateThreshold = gs.daysAgo(daysThreshold);

grCI.addQuery('sys_updated_on', '<', dateThreshold);
grCI.query();

while (grCI.next()) {
    gs.info('Unused CI: ' + grCI.name + ', Last Updated: ' + grCI.sys_updated_on);
}
