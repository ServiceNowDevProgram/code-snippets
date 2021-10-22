var now = gs.nowDateTime();
gs.info('Now: ' + now);
var monthsAgo = gs.monthsAgoStart(5); //Returns a date and time for the start of the month a certain number of months (in bracket) ago.
gs.info('Start of 5 Months Ago: ' + monthsAgo);

//Output Example:
//*** Script: Now: 2021-10-04 15:00:53
//*** Script: Start of 5 Months Ago: 2021-05-01 00:00:00
