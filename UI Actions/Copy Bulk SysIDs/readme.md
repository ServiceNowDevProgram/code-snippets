Did you ever get any use case where you need to copy SysIDs in bulk from a list view?

The use case can be:
There is some matrix that you need to validate in your script.
You need to store the sysids in a property. One option is to export the CSV with Sys id field using ?CSV&sysparm_default_export_fields=all method, 
then convert in comma separated list.

![image](https://github.com/user-attachments/assets/90228462-cc67-4a99-b4e0-b1295c46bd67)

Created this small utility to fasten the process of copying bulk sysids

1. Navigate to System Definitions > UI Actions > Create New
2. Give the Name of your choice e.g “Copy Bulk SysIDs”
3. Select Table as “Global” so it is available on every list.
4. Tick the Client and List choice field checkbox and call the function in Onclick field
5. Write below code inside the function in Script field.
**var sysIds = g_list.getChecked();
copyToClipboard(sysIds);**

