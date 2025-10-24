**Scenario**:

In some catalog items, we might want to make attachments mandatory based on certain conditions.
To achieve this, we typically use an Attachment variable on the catalog item.

When a user submits the catalog item, any attachments uploaded through this variable are stored in the sys_attachment
table with the table name set to the variable’s source — usually ZZ_YYsc_cat_item_producer.
However, in certain cases, we might want these attachments to be associated directly with the RITM (sc_req_item) record instead of staying linked
to the variable.

**Solution**:

We can create an After Insert Business Rule on the sc_req_item table that automatically reassigns such attachments to the corresponding RITM.

This rule will run only for RITMs created from specific catalog items, as defined in the filter condition of BR, and retrieve the attachment record from the sys_attachment table using the attachment variable value. It will then update the table_name to 'sc_req_item'.
