var now = gs.nowDateTime();
gs.info('Now: ' + now);
var minAgo = gs.minutesAgoEnd(5); //Returns a date and time for the end of the minutes (in brackets) a certain number of minutes ago.
gs.info('End of 5 Minutes Ago: ' + minAgo);

//Output Example:
//*** Script: Now: 2021-10-04 14:31:23
//*** Script: End of 5 Minutes Ago: 2021-10-04 18:26:59
