var table_name = 'sys_attachment_doc'; //The file data of attachment is stored in this Table in ServiceNow

var tabSizeinGB = new GlideRecord('sys_physical_table_stats');
tabSizeinGB.addQuery('table_name', table_name); //Querying with the 'sys_attachment_doc' table to get the size of it
tabSizeinGB.setLimit(1); //This will limit to one record query
tabSizeinGB.query();
if (tabSizeinGB.next()) {
    gs.info('[' + tabSizeinGB.getValue('table_name') +']' + ' table Size is: ' + tabSizeinGB.getValue('table_size_in_gb') + ' GB');
} else {
    gs.info('Table not found!');
}
