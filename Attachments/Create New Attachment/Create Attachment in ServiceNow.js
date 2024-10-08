var attachmentSource = 'billing_case:' +current.sys_id;
				
		var attachmentPayload = current.data_export_to_pd; // this field contains the payload of attachment
		var encodedPayload = gs.base64Encode(attachmentPayload);
		
		var rec = new GlideRecord('ecc_queue');
		rec.initialize();
		rec.agent = "AttachmentCreator";
		rec.topic = "AttachmentCreator";
		rec.name = attachmentName;
		rec.source = attachmentSource;
		rec.payload = encodedPayload;
		
		var flag = rec.insert();
