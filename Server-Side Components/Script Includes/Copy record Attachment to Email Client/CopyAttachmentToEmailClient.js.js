var CopyAttachmentToEmailClient = Class.create();

CopyAttachmentToEmailClient.prototype = {
	initialize: function() {
	},

	copyAttachment: function(sourceTable, sourceSysId, targetSysId) {
		var attachmentRecord = new GlideRecord('sys_attachment');
		attachmentRecord.addQuery('table_sys_id', sourceSysId);
		attachmentRecord.query();
		if (attachmentRecord.next()){
			GlideSysAttachment.copy(sourceTable, sourceSysId, 'sys_email', targetSysId);
		}
	
	}

	type: 'CopyAttachmentToEmailClient'
};