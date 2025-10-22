How to use this script:

1. Create new Script Include named as "getXMLContent"
2. Add the script provided in the code.js script

How to Test this script:

1. Create Data source XML Type
2. Attach a xml attachment to it
3. Use the script include in below format
4. Pass the Data source table name and sysid of the data source in the function

This script block will extract the XML content from the ServiceNow XML attachment. Below is an example:

```var xmlContent = new getXMLContent();```

```gs.print(xmlContent.getXMLContentFromAttachment('sys_data_source',<sys_id of the record where attachment attached>));```
