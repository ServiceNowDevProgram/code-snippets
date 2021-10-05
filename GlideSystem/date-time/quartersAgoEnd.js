var now = gs.nowDateTime();
gs.info('Now: ' + now);
var quartersAgo = gs.quartersAgoEnd(2); //Returns a date and time for the last day of the quarter, for a specified number of quarters ago
gs.info('End of 2 Quarters Ago: ' + quartersAgo);

//Output Example:
//*** Script: Now: 2021-10-04 15:48:46
//*** Script: End of 2 Quarters Ago: 2021-06-30 23:59:59
