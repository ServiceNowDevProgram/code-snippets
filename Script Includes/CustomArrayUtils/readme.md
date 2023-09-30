# arrToJSON

Convert input array to JSON

```
var arrayObj = ['name','John','age','30'];
var outputObj = new CustomArrayUtils().arrToJSON(arrayObj, true);
```

output would be a JSON Object like: `{"name":"John","Age":"32"}`

# mergeArray
Comparing two arrays of objects

This is something I wrote when comparing JSON objects from MRVS that were leveraged on a catalog item to maintain CMDB relationships, however, doesn't have to be limited to that.

```
var original = [{sys_id: '1', name: 'John'}, {sys_id: '2', name: 'Jane'}];
var modified = [{sys_id: '1', name: 'Johnny'}, {sys_id: '3', name: 'Jake'}];
var outputObj = new CustomArrayUtils().mergeArray(original, modified, 'sys_id', 'name');
gs.info(outputObj);
```
output would be an array of objects:
```
    [
        {sys_id: '1', name: 'Johnny', action: 'edit'},
        {sys_id: '2', name: 'Jane', action: 'delete'},
        {sys_id: '3', name: 'Jake', action: 'insert'}
    ]
```