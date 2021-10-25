This script block will extract the XML content from the ServiceNow XML attachment. Below is an example:

```var gr = new getXMLContent();```

```gs.print(gr.getXMLContentFromAttachment(<TableName>,<sys_id of the record where attachment attached>));```
