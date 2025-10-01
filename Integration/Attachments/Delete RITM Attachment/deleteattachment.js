// To automatically delete RITM attachment, when an attachment is deleted on SCTASK.
// Create a After Delete Business Rule on sys_attachment table, and set business rule condition as Table name is "sctask", so that when an attachment is deleted on SCTASK, this business rule will run.

var glideAttachment = new GlideRecord("sys_attachment");
    var glideTask = new GlideRecord('sc_task');
    if (glideTask.get(current.table_sys_id)) {
        glideAttachment.addEncodedQuery("table_name=sc_req_item^table_sys_id=" + glideTask.request_item.sys_id + "^file_name=" + current.file_name);
        glideAttachment.query();
        if(glideAttachment.next())
        
		var attachment = new GlideSysAttachment();
			attachment.deleteAttachment(glideAttachment.getValue("sys_id"));

    }

})(current, previous);
