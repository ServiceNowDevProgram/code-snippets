Using Excel Attachment feature you can export the table contents in excel. This script include can be use for making an excel sheet from ServiceNow script and adding it to a record as an attachment.
Usage Example:

```
var row = [{'number':'inc000001','short_description':'test'},{'number':'inc000002','short_description':'test2'}];

var table = 'incident'; //Table name
var recordId = '552c48888c033300964f4932b03eb092'; //sysid of the record
var fileName = 'ExampleEXL'; //File name
var headerColumns = ['Number','Summary']; //Excel Header Columns

var attach = new excelAttachment();
attach.addExcelAttachment(table, recordId, fileName, row, headerColumns);
```
