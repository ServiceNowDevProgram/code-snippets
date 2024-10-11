var attachmentSource = 'billing_case:' +current.sys_id;
				
		var attachmentPayload = current.data_export_to_pd; // this field contains the payload of attachment
		var encodedPayload = gs.base64Encode(attachmentPayload);
		
		var rec = new GlideRecord('ecc_queue');
		rec.initialize();
		rec.agent = "AttachmentCreator";//Name of agent to process attachment creation
		rec.topic = "AttachmentCreator";
		rec.name = attachmentName; //file name
		rec.source = attachmentSource; // source from where the file is coming
		rec.payload = encodedPayload; //file content
		
		var flag = rec.insert();
