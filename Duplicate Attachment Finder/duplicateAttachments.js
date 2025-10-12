(function() {
	var attachmentGr = new GlideRecord('sys_attachment');
	attachmentGr.orderByDesc('sys_created_on');
	attachmentGr.query();

	var attachments = {};
	var duplicateList = [];

	while(attachmentGr.next()) {
		var key = attachmentGr.file_name + '|' + attachmentGr.size_bytes;
		if(!attachments[key]) {
			attachments[key] = [];
		}
		attachmentGr[key].push({
			sys_id: attachmentGr.sys_id.toString(),
			table_name: attachmentGr.table_name.toString(),
			table_sys_id: attachmentGr.table_sys_id.toString,
			created_on: attachmentGr.sys_created_on.toString()
		})
	}

	for (var i in attachments) {
		if(attachments[i].length > 1) {
			duplicateList.push({
				file_key: i,
				count: attachments[i].length,
				records: attachments[i]
			})
		}
	}

	if (duplicateList.length === 0) {
        gs.info('No duplicate attachments found.');
    } else {
        gs.info('Found ' + duplicateList.length + ' duplicate attachments:');
        duplicateList.forEach(function(dup) {
            gs.info('File: ' + dup.file_key + ' | Count: ' + dup.count);
            dup.records.forEach(function(r) {
                gs.info('  Sys_ID: ' + r.sys_id + ' | Table: ' + r.table_name + ' | Record: ' + r.table_sys_id + ' | Created On: ' + r.created_on);
            });
        });
    }
}());