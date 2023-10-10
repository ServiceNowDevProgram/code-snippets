
        if (current.table_name == 'sc_task') 
            var id = current.table_sys_id;
        var gr = new GlideAggregate('sn_customerservice_technology_services');
        gr.addQuery('sc_task.sys_id', id);
        gr.query();
        if (gr.next()) {
            var grSA = new GlideAggregate('sys_attachment');
            grSA.addQuery("table_name", 'sc_task');
            grSA.addQuery("table_sys_id", id);
            grSA.addQuery('file_name', current.file_name);
            grSA.query();
            if (grSA.next()) {
            if (grSA.getRowCount() >1) {
			grSA.deleteRecord('id');
				}
					else {					
                        var grSAafter = new GlideAggregate('sys_attachment');
                        grSAafter.initialize();
                        grSAafter.file_name = current.file_name;
                        grSAafter.content_type = current.content_type;
                        grSAafter.compressed = current.compressed;
                        grSAafter.table_name = 'sn_customerservice_technology_services';
                        grSAafter.size_bytes = current.size_bytes;
                        grSAafter.size_compressed = current.size_compressed;
                        grSAafter.table_sys_id = gr.sys_id;
                        var grSAafterRec = grSAafter.insert();

                        var grSAafterDoc = new GlideAggregate('sys_attachment_doc');
                        grSAafterDoc.addQuery('sys_attachment', current.sys_id);
                        grSAafterDoc.query();
                        while (grSAafterDoc.next()) {
                           
                          var grSAafterDocCopy = new GlideAggregate('sys_attachment_doc');
                            grSAafterDocCopy.initialize();
                            grSAafterDocCopy.sys_attachment = grSAafterRec;
                            grSAafterDocCopy.position = grSAafterDoc.position;
                            grSAafterDocCopy.length = grSAafterDoc.length;
                            grSAafterDocCopy.data = grSAafterDoc.data;
                            grSAafterDocCopy.insert();
                        }
                    }
				
			
                }
            }

