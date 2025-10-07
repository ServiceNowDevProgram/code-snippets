# Create a new story task

When viewing a record in the rm_story table, this bookmarklet will create a new child task and enable you to pre-populate values. The example below will create a task of type `Testing` and set the short description to `Test STRY12345 - Short Description` where the story number and short description values are taken from the story record.

```js
javascript:
var w=window.frames["gsft_main"]!==undefined?window.frames["gsft_main"]:window;
var q="parent="+w.g_form.getUniqueValue()+
"^type=4"+
"^short_description=Test "+w.g_form.getValue("number")+" - "+w.g_form.getValue("short_description")+
"^EQ";
top.open("rm_scrum_task.do?sys_id=-1&sysparm_query="+q);
```