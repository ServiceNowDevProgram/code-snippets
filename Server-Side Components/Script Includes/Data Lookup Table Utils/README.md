# Data Lookup Table Utils

This script include provides a quick method of looking up data from any table extended from dl_matcher (Data Lookup Matcher Rules).  

It will build a list of the columns for the specified table and then allow you to query based on an array of values.

For example, using the dl_u_priority table we could lookup the Urgency values for a given Impact as follows;

```javascript
var lib = new global.DataLookupUtils("dl_u_priority")

var lookupData = lib.getLookupData("1");
gs.info(lookupData);
```
This will return *1,2,3*.

By also passing in a second value we can filter on Urgency and Impact;

```javascript
var lib = new global.DataLookupUtils("dl_u_priority")

var lookupData = lib.getLookupData(["1", "2"]);
gs.info(lookupData);
```
This will return *2*.

We could also ignore the Impact column and lookup Priority for a given Urgency by setting our own lookup columns;

```javascript
var lib = new global.DataLookupUtils("dl_u_priority")
lib.setColumns(["urgency", "priority"]);

var lookupData = lib.getLookupData(["3"]);
gs.info(lookupData);
```
This will return *3,4,5*

