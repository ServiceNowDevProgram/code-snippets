# Observe Multi-row variable set events

Using the MutationObserver API we can monitor changes to a multi-row variable set (i.e., new rows, deleted rows and updated rows).
This currently only works in the platform, not Workspace or Service Portal.

Use in a onLoad client script (Isolate script = false).  Sets up an observer on the named variable set and any changes are returned in the mutationList object.
Return value will list changes to the variable set.  For example:

```json
{
   "removed": [
      {
         "VM #": "2",
         "Name": "2",
         "row_number": 1,
         "row_id": "row_9652c56347f5311001612c44846d433f"
      }
   ]
}
```


```javascript

function onLoad() {
	
    setTimeout(function() {
	var mrvs = new MRVSUtils('name of multi-row-variable-set');
        var observer = new MutationObserver(function(mutationList, observer) {
            var modifiedData = mrvs.processMutations(mutationList);
            console.log(JSON.stringify(modifiedData, '', 3));
        });

        // create the observer looking for changes to the contents of the MRVS
        observer.observe($(mrvs.getTableID()), MRVSUtils.OBSERVER_CONFIG);

    }, 1000);

}
```

