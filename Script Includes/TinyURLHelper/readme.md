This utility Helps to make a tiny url in code. For example, lets say you are creating a custom link
to a long list of sys_idINa,b,c,etc and want the link to make the link look like this:
https://<instance>.service-now.com/some_table_list.do?sysparm_tiny=3a2bbf87dbdc8890e670d48a489619bf

Use this script include to do that, like below example usage:

```r
var myTable = 'some_table_list';
var myLongQueryStr = 'sysparm_query=sys_idIN' + encodeURIComponent('pretend,long,list,of,sys_id');
var myCustomUrl = new TinyUrlHelper().getSert(table=myTable, queryStr=myLongQueryStr);
```
