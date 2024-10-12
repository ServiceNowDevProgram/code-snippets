**Attachment parser for Import Set API**

When Json payload comes in the staging table then payload ":" gets converted "=" due to which it becomes challenging to parse the encoded version of attachment, so, to get rid of this problem 
I have written the script include which parses the attachment correctly and inserts the same in the table.
