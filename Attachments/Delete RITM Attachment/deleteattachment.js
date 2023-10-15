// To automatically delete RITM attachment, when an attachment is deleted on SCTASK.
// Create a After Business Rule, and set business rule condition as Table name is "sctask", so that when an attachment is deleted on SCTASK, this business rule will run.

var gr = new GlideRecord("sys_attachment");
    var task = new GlideRecord('sc_task');
    if (task.get(current.table_sys_id)) {
        gr.addEncodedQuery("table_name=sc_req_item^table_sys_id=" + task.request_item.sys_id + "^file_nameSTARTSWITH" + current.file_name);
        gr.query();
        if(gr.next())
        //gr.deleteRecord();
		var attachment = new GlideSysAttachment();
			attachment.deleteAttachment(gr.getValue("sys_id"));
    }

})(current, previous);
