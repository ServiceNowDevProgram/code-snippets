/*
This script will format the JSON data in string fields on forms.
There is on OOB attribute "json_view" which can be added to field but it always reqires an extra click and has loading time issues.
*/
var chReq = new GlideRecord('change_request'); // Glide table.
chReqch.get('c83c5e5347c12200e0ef563dbb9a7190'); // sys_id of record, can be replaced with encoded query for multiple records.

chReq.u_json_field = JSON.stringify(JSON.parse(chReq.u_json_field), null, "\t");
chReq.update();
