function getAttachmentBase64(attachmentID) {
    var attachmentGR = new GlideRecord('sys_attachment');
    if (attachmentGR.get(attachmentID)) {
        var bytesContent = new GlideSysAttachment().getBytes(attachmentGR);
        var base64ImageStr = GlideStringUtil.base64Encode(bytesContent);
        var contentType = attachmentGR.getValue('content_type');
        return 'data:' + contentType + ';base64,' + base64ImageStr;
    }
}