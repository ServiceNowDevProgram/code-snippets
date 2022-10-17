(function executeRule(current, previous /*null when async*/ ) {

	var file_load_gr = new GlideRecord('x_cpts_onboarding_amzn_wkly_dsp_file_load');
	file_load_gr.addQuery('sys_id', current.sys_id);
	file_load_gr.query();
	if (file_load_gr.next()) {
		//found the record
	} else {
		return;
	}

	//update current records file name with name of attached file
	var attachment = new GlideSysAttachment();
	var agr = attachment.getAttachments('x_cpts_onboarding_amzn_wkly_dsp_file_load', file_load_gr.sys_id.toString());
	if (agr.next()) {
		//has an attachment and found it
		var LoadFileName = agr.getValue('file_name');

		file_load_gr.file_name = LoadFileName;
		file_load_gr.update();

		var importSetTableName = "x_cpts_onboarding_amazon_weekly_dsp_load";
		var transformMapIDs = "62591fe11bbb6c1053bfa93be54bcb18"; //Amazon weekly DSP file load
		var applicatonScope = "CPTS Onboarding";
		var dataSourceName = 'Amazon weekly DSP load';
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
			attach.copy('x_cpts_onboarding_amzn_wkly_dsp_file_load', file_load_gr.sys_id.toString(), 'sys_data_source', dataSource.sys_id.toString());
			dataSourceID = dataSource.sys_id;
		}

		/*
		// Schedule Load of Attachment
		// This script below initiates the data load from the attachment
		*/

		new global.EmailFileImportUtil().scheduleImport(dataSourceID, transformMapIDs);
	} else {
		return;
	}

})(current, previous);
