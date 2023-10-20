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
