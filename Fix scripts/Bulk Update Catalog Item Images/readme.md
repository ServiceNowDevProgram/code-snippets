# Bulk Catalog Item Image Change

Updates the image(s) associated with catalog items or record producers

## Description

This script can perform bulk updates of the picture and/or icon fields used in catalog items and record producers. The script will update each item that is returned in the query with the images set
in the iconSysId and pictureSysId variables. A business use for this script would be the need to update the picture and icon fields of all Apple related catalog items with an new Apple logo image.

## Getting Started

### Dependencies

* Must be in the Global scope.
* The image(s) being used must already exist in the db_image table.

### Execution

1. Copy the script from bulk-update-cat-item-images.js to either a fix script or background script in your ServiceNow instance.
2. Copy the sys_id(s) from the image that you will using from the sys_attachments table. You can use the same image for both fields or different images, it's up to you. If you have added this image using the db_image table, you can filter the sys_attachments table name column to ZZ_YYdb_image to make it easier to find.
3. Update the script variables as follows:
    * **table**: the table you want to change the icons for the catalog item(s) - commonly sc_cat_item or sc_cat_item_producer
    * **iconSysId**: the sys_id of the image to be used for the icon (NOTE - you can comment this line out if you don't want to update the icon)
    * **pictureSysId**: the sys_id of the image to be used for the picture (NOTE - you can comment this line out if you don't want to update the picture)
    * **query**: the encoded query you will use to identify the items to be updated
4. Run the script and the picture and/or icon fields will be updated

## Authors

Brad Warman

https://www.servicenow.com/community/user/viewprofilepage/user-id/80167

## Version History

* 0.1
    * Initial Release
