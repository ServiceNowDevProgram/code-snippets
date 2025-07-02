# Create udpate set

When viewing a record in the rm_story table, this bookmarklet will create a update set in a DIFFERENT instance and enable you to pre-populate values. The example below will create an update set in the ficticious "MYDEV" instance and set the Name (`STRY1234 - Short Description`) and Description fields based on values taken from the story record. To use this bookmarklet, udpate the instance name and query string as needed.

```js
javascript:
var w=window.frames["gsft_main"]!==undefined?window.frames["gsft_main"]:window;
var q="name="+w.g_form.getValue("number")+" - "+w.g_form.getValue("short_description")+
    "^description=Description:  @"+w.g_form.getValue("description");
top.open("https://MYDEV.service-now.com/sys_update_set.do?sys_id=-1&sysparm_query="+q);

```