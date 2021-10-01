var Attachment = Class.create();

Attachment.prototype = {
	initialize: function(arg) {
		this.current = arg;
	},

	hasImage : function() {

		var attGr = new GlideRecord(Constants.ATTACHMENT_TABLE);
		attGr.addQuery('table_name', this.current.getTableName());
		attGr.addQuery('table_sys_id', this.current.getUniqueValue());
		attGr.addQuery('content_type', 'STARTSWITH', 'image');
		attGr.setLimit(1);
		attGr.query();

		if (attGr.hasNext()) {
			return true;
		}

		return false;
	},

	getImageID : function() {

		var attGr = new GlideRecord(Constants.ATTACHMENT_TABLE);
		attGr.addQuery('table_name', this.current.getTableName());
		attGr.addQuery('table_sys_id', this.current.getUniqueValue());
		attGr.addQuery('content_type', 'STARTSWITH', 'image');
		attGr.setLimit(1);
		attGr.query();

		if (attGr.next()) {
			return attGr.getUniqueValue();
		}

		return;
	},

	type: 'Attachment'
};