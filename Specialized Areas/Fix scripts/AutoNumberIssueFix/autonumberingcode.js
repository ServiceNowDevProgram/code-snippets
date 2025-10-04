// Fix script for autonumbering issues
// This script will be run in global using scripts Background
// Update the tableName per requirement

var nm = new NumberManager(tableName);

var query = ''; //add query string

var grTableName = new GlideRecord(tableName); // glideRecord Table Name ex. Incident

grTableName.addQuery(query);

grTableName.orderBy('sys_created_on');

grTableName.query();

while (grTableName.next()) {
	grTableName.number = nm.getNextObjNumberPadded();
	grTableName.update();
}
