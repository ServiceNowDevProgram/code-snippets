var table = 'sc_cat_item';
var iconSysId = 'f1dd1def1ba9fd1086a098e7b04bcb81'; // sys_id of icon file
var pictureSysId = 'f1dd1def1ba9fd1086a098e7b04bcb81'; // sys_id of picture file
var query = 'category=6a6ab100dbd5cc10ee115d87f49619fb^active!=true'; // query used to identify items

var grItem = new GlideRecord(table);
grItem.addEncodedQuery(query);
grItem.query();
while (grItem.next()) {
    createImage(pictureSysId, 'picture', table, grItem.sys_id);
    createImage(iconSysId, 'icon', table, grItem.sys_id);
}

function createImage(attachmentID, fieldName, tableName, tableID) {

    var attachmentGR = new GlideRecord('sys_attachment');
    attachmentGR.get(attachmentID);
    var fields = attachmentGR.getFields();
    var imageGR = new GlideRecord('sys_attachment');
    imageGR.initialize();
    imageGR.compressed = attachmentGR.compressed;
    imageGR.content_type = 'image/png';
    imageGR.size_bites = attachmentGR.size_bites;
    imageGR.size_compressed = attachmentGR.size_compressed;
    imageGR.file_name = fieldName;
    imageGR.table_name = 'ZZ_YY' + tableName;
    imageGR.table_sys_id = tableID;
    imageGR.state = '2';
    var imageID = imageGR.insert();

    copyAttachmentContent(attachmentID, imageID);

}

/*
 oldID: sys_id of existing attachment
 newID: sys_id of newly created attachment
 */
function copyAttachmentContent(oldID, newID) {
    var oldGR = new GlideRecord('sys_attachment_doc');
    oldGR.addQuery('sys_attachment', oldID);
    oldGR.query();
    while (oldGR.next()) {
        var newGR = new GlideRecord('sys_attachment_doc');
        newGR.initialize();
        newGR.data = oldGR.data;
        newGR.length = oldGR.length;
        newGR.position = oldGR.position;
        newGR.sys_attachment = newID;
        newGR.insert();
    }
}
