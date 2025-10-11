UseCase - 

Update the watchlist of any table record with the provided JSON payload which should maintain the previous watchlist user and add new one from the payload

Payload can be Array, String, List of String

//Passing List of String of SysId of users
var payload = '43435efdsre4t5953439434,43434343436fdfsd343,frtgr6565hg676767gt';
updateWatchlistFromJSON('incident','a1b2c3d4e5f678901234567890abcdef', payload);

//Passing Array of String of SysId of users
var payload = '[43435efdsre4t5953439434,43434343436fdfsd343]';
updateWatchlistFromJSON('incident','a1b2c3d4e5f678901234567890abcdef', payload);