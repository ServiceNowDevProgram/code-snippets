//Script which shows how to measure time execution of specific parts of code - for example for performance check

//Start time of Fix Script execution
var startTime = new Date().getTime();

//First method to get number of users in sys_user table
var counter = 0;
var userQuery = new GlideRecord('sys_user');
userQuery.query();
while (userQuery.next()) {
    counter++;
}
gs.info('[Fix-Script] - There are ' + counter + ' users in sys_user table.');

var part1 = new Date().getTime();

//Second method to get number of users in sys_user table
var counterSecond = 0;
var userQuerySecond = new GlideRecord('sys_user');
userQuerySecond.query();
counterSecond = userQuerySecond.getRowCount();
gs.info('[Fix-Script] - There are ' + counterSecond + ' users in sys_user table.');

//End time of Fix Script execution
var endTime = new Date().getTime();

var time1 = part1 - startTime;
var time2 = endTime - part1;

gs.info('[Fix-Script] - Execution time of startTime->part1: ' + time1 + 'ms');
gs.info('[Fix-Script] - Execution time of part1->endTime: ' + time2 + 'ms');
