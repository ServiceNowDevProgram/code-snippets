var now = gs.nowDateTime();
gs.info('Now: ' + now);
var minAgo = gs.minutesAgoStart(5); //Returns a date and time for the start of the minutes (in brackets) a certain number of minutes ago.
gs.info('Start of 5 Minutes Ago: ' + minAgo);

//Output Example:
//*** Script: Now: 2021-10-04 14:34:45
//*** Script: Start of 5 Minutes Ago: 2021-10-04 18:29:00
