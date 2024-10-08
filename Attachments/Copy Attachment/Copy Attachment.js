var att = new GlideSysAttachment();
var hr_id = new GlideRecord('sn_hr_core_case');
hr_id.get("1111111111111111111111111111111);//sys_id of record
att.copy("incident",current.sys_id,"sn_hr_core_case", hr_id.sys_id);

