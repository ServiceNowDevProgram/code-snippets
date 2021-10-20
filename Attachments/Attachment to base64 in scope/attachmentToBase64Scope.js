/***** 
 * Function to parse an attachment to base64 in scope as it uses GlideSysAttachment API
 * Used in for exmpale API calls
 * Input to the function are both strings for table name and record sysId
 * ******/
function parseAttachmentToBase64(tableName, recordId) {

var attachmentAPI = new GlideSysAttachment();
var attachmentGR = attachmentAPI.getAttachments(tableName, recordId);
    if(attachmentGR.next()){
        var base64Attachment = attachmentAPI.getContentBase64(attachmentGR);
        return base64Attachment;
    }
    else{
        return "no attachment found";
        }

    }