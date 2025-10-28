var now = gs.nowDateTime();
gs.info('Now: ' + now);
var monthsAgo = gs.monthsAgo(5); //Returns a date and time for a certain number of months (in brackets) ago.
gs.info('5 Months Ago: ' + monthsAgo);

//Output Example:
//*** Script: Now: 2021-10-04 14:47:23
//*** Script: 5 Months Ago: 2021-05-04 18:47:23
