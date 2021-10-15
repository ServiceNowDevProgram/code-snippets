var now = gs.nowDateTime();
gs.info('Now: ' + now);
var yesterdayDateTime = gs.yesterday(); //Returns yesterday's time (24 hours ago).
gs.info('24 Hours Ago: ' + yesterdayDateTime);

//Output Example:
//*** Script: Now: 2021-10-05 08:59:50
//*** Script: 24 Hours Ago: 2021-10-04 08:59:50
