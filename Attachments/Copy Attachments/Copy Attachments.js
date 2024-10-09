var att = new GlideSysAttachment();
var hr_id = new GlideRecord('problem');
hr_id.get("1111111111111111111111111111111);//sys_id of record
att.copy("incident",current.sys_id,"problem", hr_id.sys_id);
