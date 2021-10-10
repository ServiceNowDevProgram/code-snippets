var PolicyPDFHelper = Class.create();
PolicyPDFHelper.prototype = {
    initialize: function () {
    },

    getPDFBase64: function (kbSysId, landscape) {
        var grKB = new GlideRecord('kb_knowledge'),
            gsattachment = new GlideSysAttachment(),
            body = '',
            text = '';

        grKB.get(kbSysId);
        text = grKB.getValue('text');

        var att = this.generatePDFAttachment(text, kbSysId, 'kb_knowledge', kbSysId, landscape);

        if (att) {
            var retval = this.getAttNameAndBase64(att, true);
			if (retval) {
				if (retval.base64) {
					return retval.base64;
				}
			}
        }
        return false;
    },

    generatePDFAttachment: function (html, fileName, tableName, recordSysId, landscape) {
        var body = '';
        /* 
        PDF exports don't seem to like '/sys_attachment' for images. 
        It works in the web interface, but will not export correctly.
        Here I remove the forward slashes which is causing the issue. 
        */
        if (html.indexOf('/sys_attachment.do?sys_id') > -1) {
            html = html.replace(/\/sys_attachment/g, 'sys_attachment');
        }

        body = (landscape) ? '<style>@page {size: A4 landscape;}</style>' + html : html;

        // Generate the PDF and attach it to the KB record. 
        var att = new sn_pdfgeneratorutils.PDFGenerationAPI().convertToPDF(body, tableName, recordSysId, fileName, '');
        if (att.attachment_id) {
            return att.attachment_id;
        }
        return false;
    },

    getAttNameAndBase64: function (attSysId, deleteRecord) {
        var grAttachment = new GlideRecord('sys_attachment'),
            gsattachment = new GlideSysAttachment();
        // Get the PDF we just attached. 
        if (grAttachment.get(attSysId)) {
            // Get the base64 of the content for the download. 
            var attachmentContent = gsattachment.getContentBase64(grAttachment),
                fileName = grAttachment.getValue('file_name');

            if (attachmentContent) {
                if (deleteRecord) {
                    // Now that we have the base64, let's delete the attachment record. 
                    grAttachment.deleteRecord();
                }
                return {
                    'file_name': fileName, 'base64': attachmentContent
                };
            }
        }
        return false;
    },

    type: 'PolicyPDFHelper'
};
