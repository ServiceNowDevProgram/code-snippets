# Fixscript for autonumbering issues
# This script will be run in global using scripts Background
# Update the tableName per requirement

var nm = new NumberManager(tableName);
var gr = new GlideRecord(tableName);
gr.orderBy('sys_created_on');
gr.query();
while (gr.next()) {
	gr.number = nm.getNextObjNumberPadded();
	gr.update();
