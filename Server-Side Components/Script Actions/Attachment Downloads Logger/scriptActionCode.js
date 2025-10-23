var recordSysId = current.table_sys_id; //get the sys_id of the record to which the attachment is linked
var userSysId = event.user_id; //the user who read the attachment
var userName = event.user_name; // get the user name
var attachmentName = event.parm1; //get the attachment name
var tableName = current.table_name; //get the table name

var gr = new GlideRecord(tableName);
if (gr.get(recordSysId)) {
  gr.work_notes = `Attachment "${attachmentName}" was downloaded by user "${userName}" on ${new GlideDateTime().getDisplayValue()}.`;
  gr.update();
}
