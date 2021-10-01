# ListFieldUtil
Script Include that helps with handling list fields, like for example "Watch List" on the task table.

It doesn't use the typical `Class.create`, instead it is a simple javascript function.
Check out this blog post for more info about the "Function Pattern": https://codecreative.io/blog/interface-design-patterns-function-pattern/

## Example Script
```javascript
var watchListVal = grMyIncident.getValue("watch_list");
//add current user to watch list
var newWatchListVal = ListFieldUtil(watchListVal).add(gs.getUserID());
grMyIncident.setValue("watch_list", newWatchListVal);

//remove current user from watch list
var newWatchListVal = ListFieldUtil(watchListVal).remove(gs.getUserID());
grMyIncident.setValue("watch_list", newWatchListVal);

//check if current user exists in watch list
var currentUserInWatchList = ListFieldUtil(watchListVal).exists(gs.getUserID());
gs.debug("Current user is in watch list: " + currentUserInWatchList);
```