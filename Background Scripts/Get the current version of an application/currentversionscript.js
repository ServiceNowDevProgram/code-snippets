// Replace 'Project Workspace' with the name of the application you want to check
var appName = 'Project Workspace';

var appRecord = new GlideRecord('sys_app');
appRecord.addQuery('name', appName);
appRecord.query();

if (appRecord.next()) {
    gs.print("Application Name: " + appName);
    gs.print("Current Version: " + appRecord.getValue('version'));
} else {
    gs.print("The Application '" + appName + "' is not found.");
}
