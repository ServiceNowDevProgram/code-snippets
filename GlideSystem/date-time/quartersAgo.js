var now = gs.nowDateTime();
gs.info('Now: ' + now);
var quartersAgo = gs.quartersAgo(2); //Returns a date and time for a certain number of quarters ago
gs.info('2 Quarters Ago: ' + quartersAgo);

//Output Example:
//*** Script: Now: 2021-10-04 15:41:32
//*** Script: 2 Quarters Ago: 2021-04-04 15:41:32
