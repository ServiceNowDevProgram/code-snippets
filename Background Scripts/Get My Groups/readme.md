The GlideSystem User object has a useful function, which is called getMyGroups. This gives back the sys_ids of current user's group. But the functionality behaves differently depending where it is called from.

If the function is called from Global scope a Java object (com.glide.collections.StringList) is returned:

``` Javascript
var currentUserGroups = gs.getUser().getMyGroups();
gs.info(currentUserGroups);
gs.info('Object type: ' + Object.prototype.toString.call(currentUserGroups));
```

Result:
``` Text
*** Script: [723aa84f5ba02200502f6ede91f91aea, cfcbad03d711110050f5edcb9e61038f]
*** Script: Object type: [object JavaObject]
```
When the function is called from Application scope, the type will be a Javascript Array object:
``` Text
x_149822_va_code_p: 723aa84f5ba02200502f6ede91f91aea,cfcbad03d711110050f5edcb9e61038f
x_149822_va_code_p: Object type: [object Array]
```
The main problem here is that the StringList class behaves differently like a generic JS Array. For example you cant get an element from the collection based on its index (currentUserGroups[0]).

``` Text
Javascript compiler exception: Java class "com.glide.collections.StringList" has no public instance field or method named "0". (null.null.script; line 8) in:
var currentUserGroups = gs.getUser().getMyGroups();
```
The solution below gives a generic way, how this function can be called from both type of Applications:

``` Javascript
var currentUserGroups = gs.getUser().getMyGroups();

if (Object.prototype.toString.call(currentUserGroups).match(/^\[object\s(.*)\]$/)[1] == "JavaObject") {
    var arrayUtil = new global.ArrayUtil();
    currentUserGroups = arrayUtil.convertArray(currentUserGroups);
}

gs.info(currentUserGroups);
gs.info('Object type: ' + Object.prototype.toString.call(currentUserGroups));
```

Global:
``` Text
*** Script: 723aa84f5ba02200502f6ede91f91aea,cfcbad03d711110050f5edcb9e61038f
*** Script: Object type: [object Array]
```

Scoped app:
``` Text
x_149822_va_code_p: 723aa84f5ba02200502f6ede91f91aea,cfcbad03d711110050f5edcb9e61038f
x_149822_va_code_p: Object type: [object Array]
```
So with this simple solution the collection of groups can be handled as a JS Array in both cases.
