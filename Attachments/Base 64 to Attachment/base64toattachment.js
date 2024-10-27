/*************************************************************************************/
// INPUT ARGUMENTS
// content - Base 64 of an attachment
// fileName - Name of the attachment that should be created with extension eg incidents.xls
// contentType - Content Type value of the attachment eg 	application/vnd.ms-excel, image/jpeg
// table - Table where the new attachment should be uploaded
// record - Record where the new attachment should be uploaded

// OUTPUT ARGUMENTS
// attachmentId - sys_id of attachment
/*************************************************************************************/

function convertBase64ToAttachment(content, fileName, contentType, table, record) {
    var attachRecord = new GlideRecord(table);
    if(attachRecord.get(record)){
		  var sysAttachment = new GlideSysAttachment();
		  var decodeAttachment = GlideStringUtil.base64DecodeAsBytes(content);
		  var attachmentId = sysAttachment.write(attachRecord, fileName, contentType, decodeAttachment);
		  return attachmentId;
	}else{
		return "Record not found";
	}	
}
