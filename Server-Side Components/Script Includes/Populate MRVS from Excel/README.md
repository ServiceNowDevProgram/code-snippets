This script allows to parse the excel file attached to the attachment variable and populate the MRVS present in the
catalog item / record producer.
Use this script in a client-callable script include along with an onChange client script on the attachment variable.

When a file is uploaded as an attachment, it's metdata is stored in the sys_attachment table and sys_attachment_doc contains
the actual binary content.

**getContentStream()** converts the binary content in a way so that it can be parsed by GlideExcelParser API.

**Example used-**

The excel has two columns "Id" and "Name" to store employee details. MRVS also has the variable name as "employee_id" and "employee_name".




