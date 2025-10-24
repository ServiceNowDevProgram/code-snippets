Copy attahements from Sc task  table to case table, using custom function to avaoid duplicate copies.

Attachment file will have one or more entries in the sys_attachment_doc table.
When we upload an attachment file to ServiceNow, a record is created in the Attachments table with some metadata, including the file name,
content type, and the size of the attached file.
the sys_attachment record essentially just contains metadata about the attachment. 
The actual binary data of the file is split into chunks, which are then saved into the Data field of the Attachment Documents table. 
The Attachment Documents table also contains a reference field (sys_attachment), which points to the parent record in the Attachments table. 


