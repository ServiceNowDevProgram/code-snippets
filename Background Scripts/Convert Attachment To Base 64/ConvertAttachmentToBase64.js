/* attGr is a GlideRecord from sys_attachment table */

function attachmentToBase64(attGr) {

    /* constructor of GlideSysAttachment class */
    var gst = new GlideSysAttachment();

    /* fetching the attachment content in bytes */
    var bytes = gst.getBytes(attGr);

    /* encoding the bytes in base64 format */
    var base64Content = GlideStringUtil.base64Encode(bytes);

    return base64Content;

}
