
var grSysAtt = new GlideRecord('sys_attachment');
grSysAtt.get(''); //mention your attachment sys_id from sys_attachment table
var content = new GlideSysAttachment().getContentStream(grSysAtt.sys_id);
new GlideSysAttachment().writeContentStream(current, grSysAtt.getValue('file_name'), grSysAtt.getValue('content_type'), content);









