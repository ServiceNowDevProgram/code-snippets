var now = gs.nowDateTime();
gs.info('Now: ' + now);
var monthsAgo = gs.monthsAgoEnd(5); //Returns a date and time for the last day of the month a certain number of months (in bracket) ago
gs.info('End of 5 Months Ago: ' + monthsAgo);

//Output Example:
//*** Script: Now: 2021-10-04 14:53:40
//*** Script: End of 5 Months Ago: 2021-05-31 23:59:59
