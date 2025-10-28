var attachmentRecord = new GlideRecord('sys_attachment');
attachmentRecord.addQuery('table_name', 'sn_hr_core_task');
attachmentRecord.addQuery('table_sys_id', current.sys_id);
attachmentRecord.query();

if (attachmentRecord.getRowCount() > 1) { // Check if more than one attachment exists
    gs.addErrorMessage('Only one attachment is permitted for this task: ' + current.sys_id); // Specific error message
    current.setAbortAction(true); // Abort the action
}
