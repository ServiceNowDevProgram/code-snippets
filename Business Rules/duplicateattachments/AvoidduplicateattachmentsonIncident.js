
   if(current.table_name=="incident") {
	
	var attached = new GlideRecord('sys_attachment');
	attached.addQuery('table_name','incident');
	attached.addQuery('table_sys_id', current.table_sys_id);
	attached.addQuery('file_name',current.file_name);
	attached.query();
	if(attached.next())
		{
			
			gs.addInfoMessage('Attachement already Exists with the Same Name do not upload same attachement');
			current.setAbortAction(true);
		
		}
      }
