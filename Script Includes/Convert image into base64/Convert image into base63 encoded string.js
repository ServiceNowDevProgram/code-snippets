var BigEncoder64 = Class.create();

BigEncoder64.prototype = {
	initialize: function() {
    },
    // This script will help to convert the image into base64 encoded string.
	GetBase64EncodedString: function(attachment_sys_id) {
		var StringUtil = new GlideStringUtil();
		var gsis = GlideSysAttachmentInputStream(attachment_sys_id);  // pass the attahment sys_id
		var baos = new Packages.java.io.ByteArrayOutputStream();
		gsis.writeTo(baos);
		baos.close();
		var base64Data = StringUtil.base64Encode(baos.toByteArray());
		return base64Data;	// return the base64 encoded string.
	},

	type: 'BigEncoder64'
};
