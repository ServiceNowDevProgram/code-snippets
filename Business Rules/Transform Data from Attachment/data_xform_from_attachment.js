(function executeRule(current, previous /*null when async*/ ) {
	

	var file_load_gr = new GlideRecord('name_of_table_to_house_loaded_file');
	file_load_gr.addQuery('sys_id', current.sys_id);
	file_load_gr.query();
	if (file_load_gr.next()) {
		//found the record
	} else {
		return;
	}

	//update filename field on custom table with name of attached file
	
	var attachment = new GlideSysAttachment();
	var agr = attachment.getAttachments('name_of_table_to_house_loaded_file', file_load_gr.sys_id.toString());
	if (agr.next()) {
		//has an attachment and found it
		var LoadFileName = agr.getValue('file_name');

		file_load_gr.file_name = LoadFileName;
		file_load_gr.update();

		var importSetTableName = "name_of_importset_table";
		var transformMapIDs = "sys_id of transform map"; //Amazon weekly DSP file load
		var applicatonScope = "name of application scope"; //if creating this inside a specific scope or else Global
		var dataSourceName = 'name_of_dataource';
		var dataSourceID = null;

		var dataSource = new GlideRecord('sys_data_source');
		dataSource.addQuery('name', dataSourceName);
		dataSource.query();
		if (dataSource.next()) {
			var attach = new GlideSysAttachment();
			var attachList = attach.getAttachments('sys_data_source', dataSource.sys_id.toString());
			while (attachList.next()) {
				attach.deleteAttachment(attachList.getValue('sys_id'));
			}
			attach.copy('name_of_table_to_house_loaded_file', file_load_gr.sys_id.toString(), 'sys_data_source', dataSource.sys_id.toString());
			dataSourceID = dataSource.sys_id;
		}

		/*
		// Schedule Load of Attachment
		// This Script Include below initiates the data load from the attachment and is provided by SN
		*/

		new global.EmailFileImportUtil().scheduleImport(dataSourceID, transformMapIDs);
	} else {
		return;
	}

})(current, previous);
