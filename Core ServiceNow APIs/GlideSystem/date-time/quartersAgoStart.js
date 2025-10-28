var now = gs.nowDateTime();
gs.info('Now: ' + now);
var quartersAgo = gs.quartersAgoStart(2); //Returns a date and time for the first day of the quarter, for a specified number of quarters ago
gs.info('Start of 2 Quarters Ago: ' + quartersAgo);

//Output Example:
//*** Script: Now: 2021-10-04 15:53:02
//*** Script: Start of 2 Quarters Ago: 2021-04-01 00:00:00
